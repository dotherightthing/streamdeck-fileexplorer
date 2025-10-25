import { ClickType, VirtualFolderItem } from "./virtualFolderItem";

export class FileItem extends VirtualFolderItem {


    override async getName(): Promise<string> {
        return await this.fileSystem.getFileName(this.path) ?? "Unknown";
    }

    override async getIconPath(): Promise<string | undefined> {
    
        const fileType = await this.fileSystem.getFileExtension(this.path)
        // Supported image types: https://docs.elgato.com/streamdeck/sdk/guides/keys#images
        const imageTypes = [".svg", ".jpg", ".jpeg", ".png", ".webp"];
        if (fileType && imageTypes.includes(fileType.toLowerCase())) {
            return this.path;
        }

        return undefined;
    }

    override onClick(clickType: ClickType): void {
        if (clickType === "normal") {
            this.fileSystem.openFileWithDefaultApplication(this.path);
        } else if (clickType === "long") {
            this.fileSystem.revealFileInExplorer(this.path);
        }
    }

}