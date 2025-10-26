import { FolderView } from "../devices/folderView";
import { VirtualFolderItem } from "./virtualFolderItem";

export class FolderItemManager {

    public indices: Map<string, number> = new Map();
    public virtualFolderItems: Map<string, VirtualFolderItem> = new Map();

    constructor(public folderView: FolderView) {
        
    }


    public addAction(actionId: string, index: number): void {
        this.indices.set(actionId, index);

        this.recalculateItemsPerPage();
    }

    public removeAction(actionId: string): void {
        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        this.recalculateItemsPerPage();
    }

    public updateIndex(actionId: string, index: number): void {
        this.indices.delete(actionId);
        this.virtualFolderItems.delete(actionId);

        this.addAction(actionId, index);
    }

    public getVirtualFolderItemForAction(actionId: string): VirtualFolderItem | undefined {
        return this.virtualFolderItems.get(actionId);
    }

    public setVirtualFolderItems(virtualFolderItems: VirtualFolderItem[]): void {
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

    public recalculateItemsPerPage(): void {
        const maxIndex = Math.max(0, ...Array.from(this.indices.values()));

        this.folderView.setItemsPerPage(maxIndex);
        this.folderView.emit("updateAction");
    }

}