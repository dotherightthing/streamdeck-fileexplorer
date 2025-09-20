import { FileSystem } from "../../wrapper/impl/fileSystem";
import { FolderView } from "../devices/folderView";

export abstract class VirtualFolderItem {

    constructor(public path: string, public folderView: FolderView, public fileSystem: FileSystem) {

    }


    abstract getName(): Promise<string> | string;

    abstract getIconPath(): Promise<string | undefined> | string | undefined;

    abstract onClick(clickType: ClickType): Promise<void> | void;

}


export type ClickType = "single" | "long";