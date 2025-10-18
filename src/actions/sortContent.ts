import streamDeck, { action, DialAction, DidReceiveSettingsEvent, KeyAction, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { SortContentSettings } from "../types/actions/settings/sortContentSettings";
import { GlobalFolderViewSettings } from "../filesystem/streamdeck/settings/globalSettings";
import { FolderViewSortDirection } from "../types/folderViewSettings/sortDirection";
import { FolderViewSortType } from "../types/folderViewSettings/sortType";
import { Analytics } from "../analytics/analytics";

/**
 * This StreamDeck action allows to sort the content of the currently opened folder on the Stream Deck.
 */
@action({ UUID: "de.artus.fileexplorer.sortcontent" })
export class SortContent extends SingletonAction<SortContentSettings> {

    longPressTimeout: Map<string, NodeJS.Timeout> = new Map();
    isGettingSettings: string[] = [];


     override onWillAppear(ev: WillAppearEvent<SortContentSettings>): Promise<void> | void {
        this.updateKeyTitleAndState(ev.action, this.getDefaultedSettings(ev.payload.settings).updateTitleToType, ev.payload.settings.switchSetting === "type");

        GlobalFolderViewSettings.instance.on("onUpdateSettings", () => this.syncToGlobalSettings(ev.action));
        this.syncToGlobalSettings(ev.action);
    }

    async syncToGlobalSettings(action: KeyAction<SortContentSettings> | DialAction<SortContentSettings>): Promise<void> {
        const globalSettings = GlobalFolderViewSettings.instance;
        const actionId = action.id;

        this.isGettingSettings.push(actionId);
        const settings = await action.getSettings()
        this.isGettingSettings = this.isGettingSettings.filter(id => id !== actionId);
        const defaultedSettings = this.getDefaultedSettings(settings);

        await action.setSettings({
            ...settings,
            sortType: globalSettings.sortType,
            sortDirection: globalSettings.sortDirection,
            sortFoldersFirst: globalSettings.sortFoldersFirst
        });

        this.updateKeyTitleAndState(action, defaultedSettings.updateTitleToType, defaultedSettings.switchSetting === "type");
    }

    override async onKeyDown(ev: KeyDownEvent<SortContentSettings>): Promise<void> {
        const actionId = ev.action.id;

        if (this.longPressTimeout.has(actionId)) {
            clearTimeout(this.longPressTimeout.get(actionId))
        }

        this.longPressTimeout.set(actionId, setTimeout(() => {
            const settings = ev.payload.settings;
            const defaultedSettings = this.getDefaultedSettings(settings);
            if (defaultedSettings.longPressToggle) {
                const switchSetting = defaultedSettings.switchSetting === "type" ? "direction" : "type";
                ev.action.setSettings({
                    ...settings,
                    switchSetting: switchSetting
                }).then(() => {
                    this.updateKeyTitleAndState(ev.action, defaultedSettings.updateTitleToType, switchSetting === "type");
                    this.sendAnalytics(switchSetting === "type" ? "sort_type" : "sort_direction");
                });
            }

            this.longPressTimeout.delete(actionId);
        }, 500))
    }


    override onKeyUp(ev: KeyUpEvent<SortContentSettings>): Promise<void> | void {
        const actionId = ev.action.id;
        let isLongPress: boolean = true;

        if (this.longPressTimeout.has(actionId)) {
            isLongPress = false;
            clearTimeout(this.longPressTimeout.get(actionId));
            this.longPressTimeout.delete(actionId);
        }

        const defaultedSettings = this.getDefaultedSettings(ev.payload.settings);

        if (!isLongPress || !defaultedSettings.longPressToggle) {
            const globalSettings = GlobalFolderViewSettings.instance;
            const allSettings = this.getAllSettingsStates();

            switch (defaultedSettings.switchSetting) {
                case "type":
                    globalSettings.sortType = this.getNextSetting<FolderViewSortType>(allSettings.sortType, globalSettings.sortType);
                    this.sendAnalytics("sort_type");
                    break;
                case "direction":
                    globalSettings.sortDirection = this.getNextSetting<FolderViewSortDirection>(allSettings.sortDirection, globalSettings.sortDirection);
                    this.sendAnalytics("sort_direction");
                    break;
            }

            globalSettings.emit("onUpdateSettings");
        }
    }




    override onDidReceiveSettings(ev: DidReceiveSettingsEvent<SortContentSettings>): Promise<void> | void {
        const settings = ev.payload.settings;
        const globalSettings = GlobalFolderViewSettings.instance;

        if (this.isGettingSettings.length !== 0) return;

        globalSettings.sortType = settings.sortType ?? globalSettings.sortType;
        globalSettings.sortDirection = settings.sortDirection ?? globalSettings.sortDirection;
        globalSettings.sortFoldersFirst = settings.sortFoldersFirst ?? globalSettings.sortFoldersFirst;

        globalSettings.emit("onUpdateSettings");
    }

    updateKeyTitleAndState(action: KeyAction<SortContentSettings> | DialAction<SortContentSettings>, updateTitle: boolean, switchTypeSelected: boolean): void {
        const globalSettings = GlobalFolderViewSettings.instance;

        if (action.isKey()) {
            action.setState(globalSettings.sortDirection === "asc" ? 0 : 1);
        }

        if (updateTitle) {
            const typeTitles: Record<FolderViewSortType, string> = {
                name: "Name",
                date: "Date",
                size: "Size"
            }
            const format = switchTypeSelected ? "-> %s" : "[%s]";
            action.setTitle(format.replace("%s", typeTitles[globalSettings.sortType]));
        } else {
            action.setTitle("");
        }
    }

    getDefaultedSettings(settings: SortContentSettings): Required<SortContentSettings> {
        const globalSettings = GlobalFolderViewSettings.instance;
        return {
            sortType: settings.sortType ?? globalSettings.sortType,
            sortDirection: settings.sortDirection ?? globalSettings.sortDirection,
            sortFoldersFirst: settings.sortFoldersFirst ?? globalSettings.sortFoldersFirst,
            switchSetting: settings.switchSetting ?? "type",
            updateTitleToType: settings.updateTitleToType ?? false,
            longPressToggle: settings.longPressToggle ?? true
        }
    }

    getAllSettingsStates(): { sortType: FolderViewSortType[]; sortDirection: FolderViewSortDirection[]; sortFoldersFirst: boolean[] } {
        return {
            sortType: ["name", "date", "size"],
            sortDirection: ["asc", "desc"],
            sortFoldersFirst: [true, false]
        };
    }

    getNextSetting<T>(allSettings: T[], currentSetting: T): T {
        const currentIndex = allSettings.indexOf(currentSetting);
        if (currentIndex === -1 || currentIndex === allSettings.length - 1) {
            return allSettings[0];
        } else {
            return allSettings[currentIndex + 1];
        }
    }

    sendAnalytics(changed: "sort_type" | "sort_direction"): void {
        Analytics.instance.sendEvent({
            event: "sort_changed",
            properties: {
                changed: changed
            }
        })
    }

}
