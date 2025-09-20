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

    isPathDirectory(path: string): Promise<boolean> | boolean {
        return fs.pathExists(path).then(exists => {
            if (!exists) return false;
            return fs.stat(path).then(stat => stat.isDirectory());
        });
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



}