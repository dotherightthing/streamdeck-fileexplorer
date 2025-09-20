import streamDeck from "@elgato/streamdeck";
import { FileSystem } from "../../wrapper/impl/fileSystem";
import { Pagination } from "../pagination/pagination";
import { FolderItemManager } from "../virtualFolderItem/folderItemManager";
import { VirtualFolderItem } from "../virtualFolderItem/virtualFolderItem";
import { FolderItem } from "../virtualFolderItem/folderItem";
import { FileItem } from "../virtualFolderItem/fileItem";

export class FolderView extends Pagination<string> {

    public currentPath: string | undefined;
    public folderItemManager: FolderItemManager = new FolderItemManager(this);

    constructor(deviceId: string, public filesystem: FileSystem) {
        streamDeck.logger.info(`Creating FolderView for device ${deviceId}`);

        super();

        this.on("visibleContentChanged", () => this.updateVirtualFolderItems());
    }

    destroy(): void {
        streamDeck.logger.info(`Destroying FolderView`);
    }

    loadFolderPath(path: string): void {
        streamDeck.logger.trace(`Loading folder path: ${path}`);

        this.currentPath = path;
        this.reloadContent();
    }

    reloadContent(): void {
        if (!this.currentPath) {
            streamDeck.logger.warn("No current path set (=> No active folder view), cannot reload content");
            return;
        }

        this.filesystem.getFolderContent(this.currentPath).then(files => {
            streamDeck.logger.trace(`Loaded folder content, found ${files.length} items.`);

            this.setItems(files);
        });
    }

    updateVirtualFolderItems(): void {
        const virtualFolderItems = this.getAllItems().map(path => this.createVirtualFolderItem(path));
        this.folderItemManager.setVirtualFolderItems(virtualFolderItems);
    }

    createVirtualFolderItem(path: string): VirtualFolderItem {
        if (this.filesystem.isPathDirectory(path)) {
            return new FolderItem(path, this, this.filesystem);
        } else {
            return new FileItem(path, this, this.filesystem);
        }
    }


}