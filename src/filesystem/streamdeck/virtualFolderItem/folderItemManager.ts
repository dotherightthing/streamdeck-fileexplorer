import streamDeck from "@elgato/streamdeck";
import { FolderView } from "../devices/folderView";
import { VirtualFolderItem } from "./virtualFolderItem";

export class FolderItemManager {

    private indices: Map<string, number> = new Map();
    private virtualFolderItems: Map<string, VirtualFolderItem> = new Map();

    constructor(public folderView: FolderView) {
        
    }


    addAction(actionId: string, index: number) {
        streamDeck.logger.info(`A - Old: ${Array.from(this.indices.entries()).join(', ')}`)

        this.indices.set(actionId, index);

        streamDeck.logger.info(`A - New: ${Array.from(this.indices.entries()).join(', ')}`)
        

        this.recalculateItemsPerPage();
    }

    removeAction(actionId: string) {
        streamDeck.logger.info(`R - Old: ${Array.from(this.indices.entries()).join(', ')}`)

        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        streamDeck.logger.info(`R -New: ${Array.from(this.indices.entries()).join(', ')}`)

        this.recalculateItemsPerPage();
    }

    updateIndex(actionId: string, index: number) {
        streamDeck.logger.info(`U - Old: ${Array.from(this.indices.entries()).join(', ')}`)

        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        this.addAction(actionId, index);

        streamDeck.logger.info(`U - New: ${Array.from(this.indices.entries()).join(', ')}`)
    }

    getVirtualFolderItemForAction(actionId: string): VirtualFolderItem | undefined {
        return this.virtualFolderItems.get(actionId);
    }

    setVirtualFolderItems(virtualFolderItems: VirtualFolderItem[]): void {
        this.virtualFolderItems.clear();

        for (const [actionId, index] of this.indices) {
            const i = index - 1 + this.folderView.getCurrentPage() * this.folderView.getItemsPerPage();
            const folderItem = virtualFolderItems[i];
            if (folderItem) {
                this.virtualFolderItems.set(actionId, folderItem);
            }
        }

        this.folderView.emit("updateAction")
    }

    recalculateItemsPerPage(): void {
        const maxIndex = Math.max(0, ...Array.from(this.indices.values()));

        this.folderView.setItemsPerPage(maxIndex);
        this.folderView.emit("updateAction");
    }

}