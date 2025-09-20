import { ClickType, VirtualFolderItem } from "./virtualFolderItem";


export class FolderItem extends VirtualFolderItem {


    override async getName(): Promise<string> {
        return await this.fileSystem.getFolderName(this.path) ?? "Unknown";
    }

    override getIconPath(): string | undefined {
        return '<svg width="48" height="48" viewBox="0 0 48 48" role="img" aria-labelledby="titleFolder3" xmlns="http://www.w3.org/2000/svg"><title id="titleFolder3">Folder</title><defs><linearGradient id="gFolder" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#FFD36E"/><stop offset="1" stop-color="#FFB24D"/></linearGradient></defs><rect x="4" y="12" width="40" height="28" rx="4" fill="url(#gFolder)"/><path d="M6 12c0-1.1.9-2 2-2h8l4 4h18v2H12l-4-4z" fill="#FFB24D" opacity="0.95"/></svg>';
    }

    override onClick(clickType: ClickType): void {
        if (clickType === "single") {
            this.folderView.loadFolderPath(this.path);
        } else if (clickType === "long") {
            this.fileSystem.openExplorerWithPath(this.path);
        }
    }

}