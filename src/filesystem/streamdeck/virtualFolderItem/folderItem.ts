import { ClickType, VirtualFolderItem } from "./virtualFolderItem";


export class FolderItem extends VirtualFolderItem {


    public override async getName(): Promise<string> {
        return await this.fileSystem.getFolderName(this.path) ?? "Unknown";
    }

    public override getIconPath(): string | undefined {
        return '';
    }

    public override onClick(clickType: ClickType): void {
        if (clickType === "normal") {
            this.folderView.loadFolderPath(this.path);
        } else if (clickType === "long") {
            this.fileSystem.openExplorerWithPath(this.path);
        }
    }

}