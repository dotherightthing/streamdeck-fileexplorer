import { EventEmitter } from "@elgato/streamdeck";
import { PaginationEvents } from "../../../types/pagination/paginationEvents";

export class Pagination<T> extends EventEmitter<PaginationEvents> {


    private items: T[] = [];
    private itemsPerPage: number = 0;
    private currentPage: number = 0;


    setItems(items: T[]): void {
        this.items = items;
        this.emit("updateContent");
    }

    getAllItems(): T[] {
        return this.items;
    }

    getItem(index: number): T | undefined {
        return this.items[index];
    }

    getItemOnCurrentPage(index: number): T | undefined {
        const globalIndex = this.currentPage * this.itemsPerPage + index;
        return this.getItem(globalIndex);
    }

    setItemsPerPage(count: number): void {
        this.itemsPerPage = Math.max(0, count);
        this.setCurrentPage(this.currentPage);
    }

    getItemsPerPage(): number {
        return this.itemsPerPage;
    }

    getTotalPages(): number {
        return Math.ceil(this.items.length / this.itemsPerPage);
    }

    getCurrentPageItems(): T[] {
        const start = this.currentPage * this.itemsPerPage;
        return this.items.slice(start, start + this.itemsPerPage);
    }

    setCurrentPage(page: number): void {
        const oldPage = this.currentPage;
        const newPage = Math.max(0, Math.min(page, this.getTotalPages() - 1));
        if (newPage !== oldPage) {
            this.currentPage = newPage;
        }

        this.emit("updateDisplay");
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    openNextPage(): void {
        if (this.isLastPage()) return;
        this.setCurrentPage(this.currentPage + 1);
    }

    openPreviousPage(): void {
        if (this.isFirstPage()) return;
        this.setCurrentPage(this.currentPage - 1);
    }

    openFirstPage(): void {
        this.setCurrentPage(0);
    }

    openLastPage(): void {
        this.setCurrentPage(this.getTotalPages() - 1);
    }

    isLastPage(): boolean {
        if (this.getItemsPerPage() === 0) return true;
        return this.currentPage >= this.getTotalPages() - 1;
    }

    isFirstPage(): boolean {
        if (this.getItemsPerPage() === 0) return true;
        return this.currentPage <= 0;
    }



}