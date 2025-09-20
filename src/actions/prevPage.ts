import streamDeck, { action, DialAction, KeyAction, KeyDownEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";
import { PrevPageSettings } from "../types/actions/settings/prevPageSetting";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.prevpage" })
export class PrevPage extends SingletonAction<PrevPageSettings> {


    override onKeyDown(ev: KeyDownEvent<PrevPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        const settings = this.getDefaultedSettings(ev.payload.settings);
        switch (settings.nav_type) {
            case "prev":
                folderView.openPreviousPage();
                break;

            case "first":
                folderView.openFirstPage();
                break;

            default:
                break;
        }
    }


    override async onWillAppear(ev: WillAppearEvent<PrevPageSettings>): Promise<void> {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        folderView.on("visibleContentChanged", () => this.updateDisplayCallback(ev.action.id));
        this.updateDisplayCallback(ev.action.id);
    }

    override onWillDisappear(ev: WillDisappearEvent<PrevPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        folderView.off("visibleContentChanged", () => this.updateDisplayCallback(ev.action.id));
    }

    updateDisplayCallback(actionId: string): void {
        const action = streamDeck.actions.getActionById(actionId);
        if (!action) return;
        if (!this.isValidAction(action)) return;

        const folderView = FolderViewManager.instance.getFolderViewForDevice(action.device.id);
        if (!folderView) return;

        if (folderView.isFirstPage() || folderView.currentPath === undefined) {
            action.setState(1);
        } else {
            action.setState(0);
        }
    }

    isValidAction(action: KeyAction<PrevPageSettings> | DialAction<PrevPageSettings>): action is KeyAction<PrevPageSettings> {
        return action.isKey() && !action.isInMultiAction();
    }


    getDefaultedSettings(settings: PrevPageSettings): PrevPageSettings {
        return {
            ...settings,
            nav_type: settings.nav_type || "prev"
        };
    }


}

