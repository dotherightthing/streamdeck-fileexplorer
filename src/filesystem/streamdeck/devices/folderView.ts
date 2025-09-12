import streamDeck from "@elgato/streamdeck";
import { FileSystem } from "../../wrapper/impl/fileSystem";
import { Pagination } from "../pagination/pagination";

export class FolderView extends Pagination<string> {

    private currentPath: string | undefined;

    constructor(deviceId: string, private filesystem: FileSystem) {
        streamDeck.logger.info(`Creating FolderView for device ${deviceId}`);

        super();
    }

    addItemDisplayAction(): void {
        this.setItemsPerPage(this.getItemsPerPage() + 1);
    }

    removeItemDisplayAction(): void {
        this.setItemsPerPage(this.getItemsPerPage() - 1);
    }

    destroy(): void {
        streamDeck.logger.info(`Destroying FolderView`);
    }

    loadFolderPath(path: string): void {
        streamDeck.logger.trace(`Loading folder path: ${path}`);

        this.currentPath = path;
        this.reloadContent(true);
    }

    getCurrentFolderPath(): string | undefined {
        return this.currentPath;
    }

    reloadContent(hardReload: boolean = false): void {
        if (!this.currentPath) {
            streamDeck.logger.warn("No current path set (=> No active folder view), cannot reload content");
            
            if (hardReload) {
                this.setItems([]);
                this.setCurrentPage(0);
            }

            return;
        }

        this.filesystem.getFolderContent(this.currentPath).then(files => {
            streamDeck.logger.trace(`Loaded folder content, found ${files.length} items. (Hard reload: ${hardReload})`);

            this.setItems(files);

            if (hardReload) {
                this.setCurrentPage(0);
            }
        });
    }

}