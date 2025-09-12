import streamDeck, { action, DialAction, KeyAction, KeyDownEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { NextPageSettings } from "../types/actions/settings/nextPageSettings";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.nextpage" })
export class NextPage extends SingletonAction<NextPageSettings> {


    override onKeyDown(ev: KeyDownEvent<NextPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        const settings = ev.payload.settings;
        switch (settings.nav_type) {
            case "next":
                folderView.openNextPage();
                break;

            case "last":
                folderView.openLastPage();
                break;

            default:
                break;
        }
    }


    override async onWillAppear(ev: WillAppearEvent<NextPageSettings>): Promise<void> {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        const settings = await ev.action.getSettings();
        if (settings.nav_type === undefined) {
            settings.nav_type = "next";
            await ev.action.setSettings(settings);
        }

        folderView.on("updateDisplay", () => this.updateDisplayCallback(ev.action.id));
        this.updateDisplayCallback(ev.action.id);
    }

    override onWillDisappear(ev: WillDisappearEvent<NextPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        folderView.off("updateDisplay", () => this.updateDisplayCallback(ev.action.id));
    }

    updateDisplayCallback(actionId: string): void {
        const action = streamDeck.actions.getActionById(actionId);
        if (!action) return;
        if (!this.isValidAction(action)) return;

        const folderView = FolderViewManager.instance.getFolderViewForDevice(action.device.id);
        if (!folderView) return;

        if (folderView.isLastPage() || folderView.getCurrentFolderPath() === undefined) {
            action.setState(1);
        } else {
            action.setState(0);
        }
    }

    isValidAction(action: KeyAction<NextPageSettings> | DialAction<NextPageSettings>): action is KeyAction<NextPageSettings> {
        return action.isKey() && !action.isInMultiAction();
    }

}

