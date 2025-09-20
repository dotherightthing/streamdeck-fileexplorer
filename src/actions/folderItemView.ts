import streamDeck, { action, ActionContext, DialAction, DidReceiveSettingsEvent, KeyAction, KeyDownEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { FolderItemViewSettings } from "../types/actions/settings/folderItemViewSettings";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";
import { FolderView } from "../filesystem/streamdeck/devices/folderView";
import { VirtualFolderItem } from "../filesystem/streamdeck/virtualFolderItem/virtualFolderItem";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.folderitemview" })
export class FolderItemView extends SingletonAction<FolderItemViewSettings> {


    override onWillAppear(ev: WillAppearEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = this.getFolderView(ev.action.id);
        if (folderView && this.validAction(ev.action)) {
            folderView.on("updateAction", () => this.updateVirtualFolderItemDisplay(ev.action.id));
            
            if (this.validSettings(ev.payload.settings)) {
                streamDeck.logger.info('WillAppear: ', ev.action.id, ev.payload.settings.view_index);

                folderView.folderItemManager.addAction(ev.action.id, ev.payload.settings.view_index);
            } else {
                this.applyEmptyDisplay(ev.action);
            }
        }
    }

    override onWillDisappear(ev: WillDisappearEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);

        streamDeck.logger.info('WillDisappear: ', ev.action.id);

        if (folderView) {
            folderView.folderItemManager.removeAction(ev.action.id);
        }
    }

    override onDidReceiveSettings(ev: DidReceiveSettingsEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = this.getFolderView(ev.action.id);

        if (folderView) {
            if (this.validSettings(ev.payload.settings)) {
                streamDeck.logger.info('DidReceiveSettings: ', ev.action.id, ev.payload.settings.view_index);

                folderView.folderItemManager.updateIndex(ev.action.id, ev.payload.settings.view_index);
            } else {
                streamDeck.logger.info('DidReceiveSettings (invalid): ', ev.action.id, ev.payload.settings.view_index);

                folderView.folderItemManager.removeAction(ev.action.id);

                if (this.validAction(ev.action)) {
                    this.applyEmptyDisplay(ev.action);
                }
            }
        }
    }

    getFolderView(actionId: string): FolderView | undefined {
        const deviceId = this.getDeviceIdForAction(actionId);
        if (!deviceId) return undefined;

        return FolderViewManager.instance.getFolderViewForDevice(deviceId);
    }

    getDeviceIdForAction(actionId: string): string | undefined {
        return this.actions.find(a => a.id === actionId)?.device.id;
    }

    getActionById(actionId: string): DialAction<FolderItemViewSettings> | KeyAction<FolderItemViewSettings> | undefined {
        return this.actions.find(a => a.id === actionId);
    }


    updateVirtualFolderItemDisplay(actionId: string): void {
        const folderView = this.getFolderView(actionId);
        if (!folderView) return;

        const virtualFolderItem = folderView.folderItemManager.getVirtualFolderItemForAction(actionId);
        const action = this.getActionById(actionId);

        if (this.validAction(action)) {
            if (!virtualFolderItem) {
                this.applyEmptyDisplay(action);
            } else {
                this.applyVirtualFolderItemDisplay(action, virtualFolderItem);
            }
        }
    }


    async applyVirtualFolderItemDisplay(action: KeyAction<FolderItemViewSettings>, virtualFolderItem: VirtualFolderItem): Promise<void> {
        action.setTitle(await virtualFolderItem.getName());
        action.setImage(await virtualFolderItem.getIconPath());
        action.setState(1);
    }


    applyEmptyDisplay(action: KeyAction<FolderItemViewSettings>): void {
        action.setTitle("");
        action.setImage(undefined);
        action.setState(0);
    }

    validSettings(settings: FolderItemViewSettings): boolean {
        return settings.view_index !== undefined && !isNaN(settings.view_index) && settings.view_index > 0;
    }

    validAction(action: KeyAction<FolderItemViewSettings> | DialAction<FolderItemViewSettings> | undefined): action is KeyAction<FolderItemViewSettings> {
        return action !== undefined && action.isKey() && !action?.isInMultiAction();
    }




}

