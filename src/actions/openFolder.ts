import { action, KeyDownEvent, SendToPluginEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { OpenFolderSettings } from "../types/actions/settings/openFolderSettings";
import { FileSystem } from "../filesystem/wrapper/impl/fileSystem";
import spawn from "cross-spawn";


/**
 * Action desctription.
 */
@action({ UUID: "de.artus.fileexplorer.openfolder" })
export class OpenFolder extends SingletonAction<OpenFolderSettings> {


	constructor(private filesystem: FileSystem) {
		super();
	}


	override async onKeyDown(ev: KeyDownEvent<OpenFolderSettings>): Promise<void> {
		const settings = await ev.action.getSettings();

		if (settings.folderpath && settings.openaction === "custom" && settings.customcommand) {
			const command = settings.customcommand.replaceAll("{path}", `"${settings.folderpath}"`);
			const parts = command.split(" ");
			const cmd = parts[0];
			const args = parts.slice(1);

			spawn(cmd, args, { stdio: "ignore", shell: true, detached: true }).unref();
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

