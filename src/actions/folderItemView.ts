import { action, DialAction, DidReceiveSettingsEvent, KeyAction, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { FolderItemViewSettings } from "../types/actions/settings/folderItemViewSettings";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";
import { FolderView } from "../filesystem/streamdeck/devices/folderView";
import { VirtualFolderItem } from "../filesystem/streamdeck/virtualFolderItem/virtualFolderItem";
import { getFolderItemImage } from "../utils/svgFactoty";
import { Analytics } from "../analytics/analytics";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.folderitemview" })
export class FolderItemView extends SingletonAction<FolderItemViewSettings> {

    longPressTimeout: Map<string, NodeJS.Timeout> = new Map();



    override onKeyDown(ev: KeyDownEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);
        if (!folderView) return;

        const actionId = ev.action.id;

        if (this.longPressTimeout.has(actionId)) {
            clearTimeout(this.longPressTimeout.get(actionId))
        }

        this.longPressTimeout.set(actionId, setTimeout(() => {

            const virtualFolderItem = folderView.folderItemManager.getVirtualFolderItemForAction(actionId);
            if (virtualFolderItem) {
                virtualFolderItem.onClick("long");
                this.sendClickAnalytics("long");
            }

            this.longPressTimeout.delete(actionId);
        }, 500));
    }


    override onKeyUp(ev: KeyUpEvent<FolderItemViewSettings>): Promise<void> | void {
        const actionId = ev.action.id;
        let isLongPress: boolean = true;

        if (this.longPressTimeout.has(actionId)) {
            isLongPress = false;
            clearTimeout(this.longPressTimeout.get(actionId));
            this.longPressTimeout.delete(actionId);
        }

        if (!isLongPress) {
            const folderView = this.getFolderView(actionId);
            if (!folderView) return;

            const virtualFolderItem = folderView.folderItemManager.getVirtualFolderItemForAction(actionId);
            if (virtualFolderItem) {
                virtualFolderItem.onClick("normal");
                this.sendClickAnalytics("normal");
            }
        }
    }



    // TODO: on appear -> very long load times to display content!
    override onWillAppear(ev: WillAppearEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = this.getFolderView(ev.action.id);
        if (folderView && this.validAction(ev.action)) {
            folderView.on("updateAction", () => this.updateVirtualFolderItemDisplay(ev.action.id));
            
            if (this.validSettings(ev.payload.settings)) {
                folderView.folderItemManager.addAction(ev.action.id, ev.payload.settings.view_index);
            } else {
                this.applyEmptyDisplay(ev.action);
            }
        }
    }

    override onWillDisappear(ev: WillDisappearEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = FolderViewManager.instance.getFolderViewForDevice(ev.action.device.id);

        if (folderView) {
            folderView.folderItemManager.removeAction(ev.action.id);
        }
    }

    override onDidReceiveSettings(ev: DidReceiveSettingsEvent<FolderItemViewSettings>): Promise<void> | void {
        const folderView = this.getFolderView(ev.action.id);

        if (folderView) {
            if (this.validSettings(ev.payload.settings)) {
                folderView.folderItemManager.updateIndex(ev.action.id, ev.payload.settings.view_index);
            } else {
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
        const svgImage = await getFolderItemImage(virtualFolderItem);
        action.setImage(svgImage);

        action.setTitle("");
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


    sendClickAnalytics(actionType: "normal" | "long"): void {
        Analytics.instance.sendEvent({
            event: "folder_item_clicked",
            properties: {
                click_type: actionType
            }
        })
    }
    


}

