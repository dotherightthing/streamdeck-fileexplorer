import streamDeck, { action, DialAction, DidReceiveSettingsEvent, KeyAction, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { NextPageSettings } from "../types/actions/settings/nextPageSettings";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.nextpage" })
export class NextPage extends SingletonAction<NextPageSettings> {


    longPressTimeout: Map<string, NodeJS.Timeout> = new Map();


    override onKeyDown(ev: KeyDownEvent<NextPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        const settings = this.getDefaultedSettings(ev.payload.settings);
        const actionId = ev.action.id;

        if (this.longPressTimeout.has(actionId)) {
            clearTimeout(this.longPressTimeout.get(actionId))
        }

        this.longPressTimeout.set(actionId, setTimeout(() => {
            switch (settings.longpressaction) {
                case "next":
                    folderView.openNextPage()
                    break;
                case "last":
                    folderView.openLastPage()
                    break;
            }

            this.longPressTimeout.delete(actionId);
        }, settings.longpresstrigger))
    }

    override onKeyUp(ev: KeyUpEvent<NextPageSettings>): Promise<void> | void {
        const actionId = ev.action.id;
        let isLongPress: boolean = true;

        if (this.longPressTimeout.has(actionId)) {
            isLongPress = false;
            clearTimeout(this.longPressTimeout.get(actionId));
            this.longPressTimeout.delete(actionId);
        }

        if (!isLongPress) {
            const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
            if (!folderView) return;

            const settings = this.getDefaultedSettings(ev.payload.settings);

            switch (settings.clickaction) {
                case "next":
                    folderView.openNextPage()
                    break;
                case "last":
                    folderView.openLastPage()
                    break;
            }
        }
    }


    override async onWillAppear(ev: WillAppearEvent<NextPageSettings>): Promise<void> {
        if (!ev.payload.settings.longpresstrigger) {
            ev.action.setSettings({
                ...ev.payload.settings,
                longpresstrigger: 500
            });
        }

        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        folderView.on("visibleContentChanged", () => this.updateDisplayCallback(ev.action.id));
        this.updateDisplayCallback(ev.action.id);
    }

    override onWillDisappear(ev: WillDisappearEvent<NextPageSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        folderView.off("visibleContentChanged", () => this.updateDisplayCallback(ev.action.id));
    }

    override onDidReceiveSettings(ev: DidReceiveSettingsEvent<NextPageSettings>): Promise<void> | void {
        this.updateTitle(ev.action, ev.payload.settings);
    }

    updateDisplayCallback(actionId: string): void {
        const action = streamDeck.actions.getActionById(actionId);
        if (!action) return;
        if (!this.isValidAction(action)) return;

        const folderView = FolderViewManager.instance.getFolderViewForDevice(action.device.id);
        if (!folderView) return;

        if (folderView.isLastPage() || folderView.currentPath === undefined) {
            action.setState(1);
        } else {
            action.setState(0);
        }

        action.getSettings(); // Triggers onDidReceiveSettings so we dont have to call updateTitle here -> less code duplication
    }

    updateTitle(action: KeyAction<NextPageSettings> | DialAction<NextPageSettings>, settings: NextPageSettings): void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(action.device.id);
        if (!folderView) return;

        const defaultedSettings = this.getDefaultedSettings(settings);

        if (defaultedSettings.showcurrentpage) {
            const currentPage = folderView.getCurrentPage();
            const lastPage = folderView.getTotalPages();
            action.setTitle(`${currentPage + 1}/${lastPage}`);
        } else {
            action.setTitle("");
        }
    }

    isValidAction(action: KeyAction<NextPageSettings> | DialAction<NextPageSettings>): action is KeyAction<NextPageSettings> {
        return action.isKey() && !action.isInMultiAction();
    }

    getDefaultedSettings(settings: NextPageSettings): Required<NextPageSettings> {
        return {
            ...settings,
            clickaction: settings.clickaction ?? "next",
            longpressaction: settings.longpressaction ?? "last",
            longpresstrigger: settings.longpresstrigger ?? 500,
            showcurrentpage: settings.showcurrentpage ?? false
        };
    }


}