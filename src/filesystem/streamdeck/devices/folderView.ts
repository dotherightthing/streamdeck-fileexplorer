import streamDeck from "@elgato/streamdeck";
import { FileSystem } from "../../wrapper/impl/fileSystem";
import { Pagination } from "../pagination/pagination";
import { FolderItemManager } from "../virtualFolderItem/folderItemManager";
import { VirtualFolderItem } from "../virtualFolderItem/virtualFolderItem";
import { FolderItem } from "../virtualFolderItem/folderItem";
import { FileItem } from "../virtualFolderItem/fileItem";
import { GlobalFolderViewSettings } from "../settings/globalSettings";

export class FolderView extends Pagination<string> {

    public currentPath: string | undefined;
    public folderItemManager: FolderItemManager = new FolderItemManager(this);
    public settings: GlobalFolderViewSettings = GlobalFolderViewSettings.instance;

    constructor(deviceId: string, public filesystem: FileSystem) {
        streamDeck.logger.info(`Creating FolderView for device ${deviceId}`);

        super();

        this.on("visibleContentChanged", () => this.updateVirtualFolderItems());
        this.settings.on("onUpdateSettings", () => this.reloadContent());
    }

    destroy(): void {
        streamDeck.logger.info(`Destroying FolderView`);
    }

    loadFolderPath(path: string): void {
        streamDeck.logger.trace(`Loading folder path: ${path}`);

        this.currentPath = path;
        this.reloadContent();
    }

    loadParentFolder(): void {
        if (!this.currentPath) return;

        const parentPath = this.filesystem.getParentPath(this.currentPath);
        if (!parentPath) {
            streamDeck.logger.warn(`No parent path found for current path: ${this.currentPath}`);
            return;
        }
        this.loadFolderPath(parentPath);
    }

    reloadContent(): void {
        if (!this.currentPath) {
            streamDeck.logger.warn("No current path set (=> No active folder view), cannot reload content");
            return;
        }

        this.filesystem.getFolderContent(this.currentPath).then(files => {
            streamDeck.logger.trace(`Loaded folder content, found ${files.length} items.`);

            this.sortItems(files).then(sortedFiles => {
                this.setItems(sortedFiles);
            });
        });
    }

    async sortItems(items: string[]): Promise<string[]> {
        const sortType = this.settings.sortType;
        const sortDirection = this.settings.sortDirection;
        const foldersFirst = this.settings.sortFoldersFirst;


        const itemData = await Promise.all(items.map(async (item) => {
            const isDir = await this.filesystem.isPathDirectory(item);
            const name = await this.filesystem.getFileName(item) || "";
            const date = await this.filesystem.getLastModifiedTime(item);
            const size = await this.filesystem.getFileOrFolderSize(item) || 0;
            return { item, isDir, name, date, size };
        }));

        itemData.sort((a, b) => {
            let comparison = 0;

            if (foldersFirst) {
                if (a.isDir && !b.isDir) {
                    return -1;
                } else if (!a.isDir && b.isDir) {
                    return 1;
                }
            }

            switch (sortType) {
                case "name":
                    comparison = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'variant' });
                    break;
                case "date":
                    const aTime = a.date ? a.date.getTime() : 0;
                    const bTime = b.date ? b.date.getTime() : 0;
                    comparison = bTime - aTime; // inverted to have newest first in "asc"
                    break;
                case "size":
                    comparison = a.size - b.size;
                    break;
            }

            const r = comparison * (sortDirection === "asc" ? 1 : -1);
            if (r === 0) {
                return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'variant' });
            }
            return r;
        });

        return itemData.map(d => d.item);
    }

    updateVirtualFolderItems(): void {
        const virtualFolderItems = this.getAllItems().map(path => this.createVirtualFolderItem(path));
        Promise.all(virtualFolderItems).then(vfi => {
            this.folderItemManager.setVirtualFolderItems(vfi);
        });
    }

    async createVirtualFolderItem(path: string): Promise<VirtualFolderItem> {
        if (await this.filesystem.isPathDirectory(path)) {
            return new FolderItem(path, this, this.filesystem);
        } else {
            return new FileItem(path, this, this.filesystem);
        }
    }


}