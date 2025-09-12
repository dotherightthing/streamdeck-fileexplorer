import { readdir } from "fs-extra";
import { FileSystemWrapper } from "../fileSystemWrapper";
import { spawn } from "cross-spawn";

export class FileSystem implements FileSystemWrapper {

    openFolderPickerDialog(): Promise<string | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("C:/Users/Arthur/Desktop/coding");
            }, 1000);
        });
    }

    openExplorerWithPath(path: string): void {
        spawn("start", ["", path], { stdio: "ignore", detached: true }).unref();
    }

    startCmdWithPath(path: string): void {
        spawn("cmd", ["/k", "", "cd", "", path], { stdio: "ignore", detached: true, shell: true }).unref();
    }

    getFolderContent(path: string): Promise<string[]> {
        return readdir(path);
    }
}