import { FileSystem } from "../../wrapper/impl/fileSystem";
import { FolderView } from "../devices/folderView";

export abstract class VirtualFolderItem {

    constructor(public path: string, public folderView: FolderView, public fileSystem: FileSystem) {

    }


    public abstract getName(): Promise<string> | string;

    public abstract getIconPath(): Promise<string | undefined> | string | undefined;

    public abstract onClick(clickType: ClickType): Promise<void> | void;

}


export type ClickType = "long" | "normal";