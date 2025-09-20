import streamDeck from "@elgato/streamdeck";
import { FolderView } from "../devices/folderView";
import { VirtualFolderItem } from "./virtualFolderItem";

export class FolderItemManager {

    private indices: Map<string, number> = new Map();
    private virtualFolderItems: Map<string, VirtualFolderItem> = new Map();

    constructor(public folderView: FolderView) {
        
    }


    addAction(actionId: string, index: number) {
        this.indices.set(actionId, index);

        this.recalculateItemsPerPage();
    }

    removeAction(actionId: string) {
        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        this.recalculateItemsPerPage();
    }

    updateIndex(actionId: string, index: number) {
        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        this.addAction(actionId, index);
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