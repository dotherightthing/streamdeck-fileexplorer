import { ClickType, VirtualFolderItem } from "./virtualFolderItem";


export class FolderItem extends VirtualFolderItem {


    override async getName(): Promise<string> {
        return await this.fileSystem.getFolderName(this.path) ?? "Unknown";
    }

    override getIconPath(): string | undefined {
        return '';
    }

    override onClick(clickType: ClickType): void {
        if (clickType === "normal") {
            this.folderView.loadFolderPath(this.path);
        } else if (clickType === "long") {
            this.fileSystem.openExplorerWithPath(this.path);
        }
    }

}