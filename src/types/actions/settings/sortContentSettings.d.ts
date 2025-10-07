import { FolderViewSortDirection } from "../../folderViewSettings/sortDirection";
import { FolderViewSortType } from "../../folderViewSettings/sortType";

export type SortContentSettings = {
    sortType?: FolderViewSortType;
    sortDirection?: FolderViewSortDirection;
    sortFoldersFirst?: boolean;

    switchSetting?: "type" | "direction";
    updateTitleToType?: boolean;
    longPressToggle?: boolean;
}