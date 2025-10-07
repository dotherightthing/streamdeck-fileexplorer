import fs from "fs-extra";
import path from "path";
import { FileSystemWrapper } from "../fileSystemWrapper";
import { spawn } from "cross-spawn";

export class FileSystem implements FileSystemWrapper {

    openFolderPickerDialog(): Promise<string | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("C:/Users/Arthur/Desktop/coding/minecraft");
            }, 1000);
        });
    }

    openExplorerWithPath(path: string): void {
        spawn("start", ["", path], { stdio: "ignore", detached: true }).unref();
    }

    startCmdWithPath(path: string): void {
        spawn("cmd", ["/k", "", "cd", "", path], { stdio: "ignore", detached: true, shell: true }).unref();
    }

    async getFolderContent(folderPath: string): Promise<string[]> {
        const items = await fs.readdir(folderPath);
        return items.map(item => path.join(folderPath, item));
    }

    async isPathDirectory(path: string): Promise<boolean> {
        const exists = await fs.pathExists(path);
        if (!exists) return false;
        const stats = await fs.stat(path);
        return stats.isDirectory();
    }

    async getFileExtension(filePath: string): Promise<string | undefined> {
        const exists = await fs.pathExists(filePath);
        if (!exists) return undefined;
        return path.extname(filePath) || undefined;
    }

    async getFileName(filePath: string): Promise<string | undefined> {
        const exists = await fs.pathExists(filePath);
        if (!exists) return undefined;
        return path.basename(filePath) || undefined;
    }

    async getFolderName(folderPath: string): Promise<string | undefined> {
        const exists = await fs.pathExists(folderPath);
        if (!exists) return undefined;
        return path.basename(folderPath) || undefined;
    }

    // TODO: Only works for files, not folders!
    async getFileOrFolderSize(path: string): Promise<number | undefined> {
        const exists = await fs.pathExists(path);
        if (!exists) return undefined;
        const stats = await fs.stat(path);
        return stats.size;
    }

    async getLastModifiedTime(path: string): Promise<Date | undefined> {
        const exists = await fs.pathExists(path);
        if (!exists) return undefined;
        const stats = await fs.stat(path);
        return stats.mtime;
    }

    getParentPath(folderPath: string): string | undefined {
        const parentPath = path.dirname(folderPath);
        if (parentPath === folderPath) {
            return undefined;
        }
        return parentPath;
    }

    openFileWithDefaultApplication(filePath: string): void {
        //TODO: check if this works!
        spawn("start", ["", filePath], { stdio: "ignore", detached: true }).unref();
    }


}