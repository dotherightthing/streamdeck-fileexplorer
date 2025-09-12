import streamDeck, { action, ActionContext, DialAction, DidReceiveSettingsEvent, KeyAction, KeyDownEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { FolderItemViewSettings } from "../types/actions/settings/folderItemViewSettings";
import { FolderViewManager } from "../filesystem/streamdeck/devices/deviceManager";
import { FolderView } from "../filesystem/streamdeck/devices/folderView";


/**
 * This StreamDeck action displays one item of a folder which is opened on the StreamDeck.
 */
@action({ UUID: "de.artus.fileexplorer.folderitemview" })
export class FolderItemView extends SingletonAction<FolderItemViewSettings> {



    override onWillAppear(ev: WillAppearEvent<FolderItemViewSettings>): Promise<void> | void {
        if (!this.isValidAction(ev.action)) return;

        this.registerItemDisplayAction(ev.action);
    }

    override onWillDisappear(ev: WillDisappearEvent<FolderItemViewSettings>): Promise<void> | void {
        this.unregisterItemDisplayAction(ev.action);
    }

    override onDidReceiveSettings(ev: DidReceiveSettingsEvent<FolderItemViewSettings>): Promise<void> | void {
        if (!this.isValidAction(ev.action)) return;

        this.updateActionDisplay(ev.action, ev.payload.settings);
    }

    isValidAction(action: KeyAction<FolderItemViewSettings> | DialAction<FolderItemViewSettings>): action is KeyAction<FolderItemViewSettings> {
        return action.isKey() && !action.isInMultiAction();
    }

    getFolderViewForAction(action: KeyAction<FolderItemViewSettings> | DialAction<FolderItemViewSettings>): FolderView | undefined {
        return FolderViewManager.instance.getFolderViewForDevice(action.device.id);
    }

    getFolderViewForDevice(deviceId: string): FolderView | undefined {
        return FolderViewManager.instance.getFolderViewForDevice(deviceId);
    }

    registerItemDisplayAction(action: KeyAction<FolderItemViewSettings>): void {
        const folderView = this.getFolderViewForAction(action);
        if (!folderView) return;

        folderView.on("updateDisplay", () => this.updateDisplayCallback(action.id));
        this.recalculateValidDisplayCount(action.device.id);
    
        if (!folderView.getCurrentFolderPath()) {
            action.getSettings<FolderItemViewSettings>().then(settings => this.updateActionDisplay(action, settings));
        }
    }

    unregisterItemDisplayAction(action: ActionContext): void {
        const folderView = this.getFolderViewForDevice(action.device.id);
        if (!folderView) return;

        folderView.off("updateDisplay", () => this.updateDisplayCallback(action.id));
        this.recalculateValidDisplayCount(action.device.id);
    }

    updateDisplayCallback(actionId: string): void {
        const action = streamDeck.actions.getActionById(actionId);
        if (!action || !this.isValidAction(action)) return;

        action.getSettings<FolderItemViewSettings>().then(settings => this.updateActionDisplay(action, settings))
    }

    updateActionDisplay(action: KeyAction<FolderItemViewSettings>, settings: FolderItemViewSettings): void {
        const folderView = this.getFolderViewForAction(action);
        if (!folderView) return;

        if (!this.actionHasValidSettings(settings) || folderView.getCurrentFolderPath() === undefined) {
            this.applyEmptyStateDisplay(action);
            return;
        }

        action.setState(1);
        action.setTitle(folderView.getItemOnCurrentPage(settings.view_index - 1) ?? "");
    }

    applyEmptyStateDisplay(action: KeyAction<FolderItemViewSettings>): void {
        action.setState(0);
        action.setTitle(FolderViewManager.instance.getFolderViewForDevice(action.device.id)?.getItemsPerPage() + "");
        action.setImage(undefined);
    }

    actionHasValidSettings(settings: FolderItemViewSettings): boolean {
        return settings.view_index !== undefined && settings.view_index > 0 && !isNaN(settings.view_index);
    }

    recalculateValidDisplayCount(deviceId: string): void {
        const folderView = this.getFolderViewForDevice(deviceId);
        if (!folderView) return;

        const actions = streamDeck.actions.filter(action => action.device.id === deviceId && this.isValidAction(action));

        Promise.all(actions.map(action => action.getSettings<FolderItemViewSettings>())).then(settingsList => {
            const validSettingsCount = settingsList.filter(settings => this.actionHasValidSettings(settings)).length;
            folderView.setItemsPerPage(validSettingsCount);
        });

    }




}

