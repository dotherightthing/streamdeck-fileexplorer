import { EventEmitter } from "@elgato/streamdeck";
import { FolderViewSortDirection } from "../../../types/folderViewSettings/sortDirection";
import { FolderViewSortType } from "../../../types/folderViewSettings/sortType";
import { FVSettingsEvents } from "../../../types/folderViewSettings/settingsEvents";


export class GlobalFolderViewSettings extends EventEmitter<FVSettingsEvents> {

    public static instance: GlobalFolderViewSettings = new GlobalFolderViewSettings();

    public sortType: FolderViewSortType = "name";
    public sortDirection: FolderViewSortDirection = "asc";
    public sortFoldersFirst: boolean = true;

    public showFileExtensions: boolean = true




}