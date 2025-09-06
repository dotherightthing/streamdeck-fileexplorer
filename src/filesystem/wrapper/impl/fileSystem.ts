import { FileSystemWrapper } from "../fileSystemWrapper";


export class FileSystem implements FileSystemWrapper {

    openFolderPickerDialog(): Promise<string | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("C:/Users/Arthur/Desktop");
            }, 1000);
        });
    }
}