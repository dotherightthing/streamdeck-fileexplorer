import { EventEmitter } from "@elgato/streamdeck";
import { PaginationEvents } from "../../../types/pagination/paginationEvents";

export class Pagination<T> extends EventEmitter<PaginationEvents> {


    private items: T[] = [];
    private itemsPerPage: number = 0;
    private currentPage: number = 0;


    public setItems(items: T[], resetPage: boolean = true): void {
        this.items = items;
        this.emit("onUpdateItems");
        this.setCurrentPage(resetPage ? 0 : this.currentPage);
    }

    public getAllItems(): T[] {
        return this.items;
    }

    public getItem(index: number): T | undefined {
        return this.items[index];
    }

    public getItemOnCurrentPage(index: number): T | undefined {
        const globalIndex = this.currentPage * this.itemsPerPage + index;
        return this.getItem(globalIndex);
    }

    public setItemsPerPage(count: number): void {
        this.itemsPerPage = Math.max(0, count);
        this.setCurrentPage(this.currentPage);
    }

    public getItemsPerPage(): number {
        return this.itemsPerPage;
    }

    public getTotalPages(): number {
        return Math.ceil(this.items.length / this.itemsPerPage);
    }

    public getCurrentPageItems(): T[] {
        const start = this.currentPage * this.itemsPerPage;
        return this.items.slice(start, start + this.itemsPerPage);
    }

    public setCurrentPage(page: number): void {
        const oldPage = this.currentPage;
        const newPage = Math.max(0, Math.min(page, this.getTotalPages() - 1));
        if (newPage !== oldPage) {
            this.currentPage = newPage || 0;
        }

        this.emit("visibleContentChanged");
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }

    public openNextPage(): void {
        if (this.isLastPage()) return;
        this.setCurrentPage(this.currentPage + 1);
    }

    public openPreviousPage(): void {
        if (this.isFirstPage()) return;
        this.setCurrentPage(this.currentPage - 1);
    }

    public openFirstPage(): void {
        this.setCurrentPage(0);
    }

    public openLastPage(): void {
        this.setCurrentPage(this.getTotalPages() - 1);
    }

    public isLastPage(): boolean {
        if (this.getItemsPerPage() === 0) return true;
        return this.currentPage >= this.getTotalPages() - 1;
    }

    public isFirstPage(): boolean {
        if (this.getItemsPerPage() === 0) return true;
        return this.currentPage <= 0;
    }



}