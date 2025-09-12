import streamDeck, { action, KeyDownEvent, SendToPluginEvent, SingletonAction } from "@elgato/streamdeck";
import { OpenFolderSettings } from "../types/actions/settings/openFolderSettings";
import { FileSystem } from "../filesystem/wrapper/impl/fileSystem";
import spawn from "cross-spawn";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";


/**
 * This StreamDeck action allows to open a folder either on the StreamDeck itself or in the native explorer or cmd or with a custom command.
 */
@action({ UUID: "de.artus.fileexplorer.openfolder" })
export class OpenFolder extends SingletonAction<OpenFolderSettings> {


	constructor(private filesystem: FileSystem) {
		super();
	}


	override async onKeyDown(ev: KeyDownEvent<OpenFolderSettings>): Promise<void> {
		const settings = await ev.action.getSettings();

		if (settings.folderpath) {

			switch (settings.openaction) {
				case "streamdeck":
					streamDeck.logger.trace(`Opening folder (${settings.folderpath}) on StreamDeck`);

					FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id)?.loadFolderPath(settings.folderpath);
					break;

				case "nativeexplorer":
					streamDeck.logger.trace(`Opening folder (${settings.folderpath}) in native explorer`);
					this.filesystem.openExplorerWithPath(settings.folderpath);
					break;

				case "cmd":
					streamDeck.logger.trace(`Opening folder (${settings.folderpath}) in cmd`);
					this.filesystem.startCmdWithPath(settings.folderpath);
					break;

				case "custom":
					if (settings.customcommand) {
						streamDeck.logger.trace(`Opening folder (${settings.folderpath}) with custom command: ${settings.customcommand}`);

						// TODO: Fix for os-specific path separators
						const command = settings.customcommand.trim().replaceAll("{path}", `"${settings.folderpath.replaceAll("/", "\\")}"`);
						const parts = command.split(" ");
						const cmd = parts[0];
						const args = parts.slice(1);

						spawn(cmd, args, { stdio: "ignore", shell: true, detached: true }).unref();
					}
					break;

				default:
					streamDeck.logger.warn(`Unknown open action: ${settings.openaction}`);
					break;
			}

		}
	}

	override async onSendToPlugin(ev: SendToPluginEvent<{ event: string }, OpenFolderSettings>): Promise<void> {
		if (ev.payload && ev.payload.event === "openfolder") {

			const path = await this.filesystem.openFolderPickerDialog();

			if (path) {
				const settings = await ev.action.getSettings()

				ev.action.setSettings({
					...settings,
					folderpath: path
				})
			}
		}
	}

}

