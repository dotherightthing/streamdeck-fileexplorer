import { FolderViewSortDirection } from "../../folderViewSettings/sortDirection";
import { FolderViewSortType } from "../../folderViewSettings/sortType";

export type SortContentSettings = {
    sortType?: FolderViewSortType;
    sortDirection?: FolderViewSortDirection;
    sortFoldersFirst?: boolean;

    switchSetting?: "direction" | "type";
    updateTitleToType?: boolean;
    longPressToggle?: boolean;
}