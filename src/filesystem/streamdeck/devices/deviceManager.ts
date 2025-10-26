import streamDeck from "@elgato/streamdeck";
import { FolderView } from "./folderView";
import { FileSystem } from "../../wrapper/impl/fileSystem";

export class FolderViewManager {

    public static instance: FolderViewManager = new FolderViewManager();
    private devices: Map<string, FolderView> = new Map();

    private constructor(private fileSystem = new FileSystem()) {
        
    }


    public static init(fileSystem?: FileSystem): FolderViewManager {
        streamDeck.logger.info("Initializing FolderViewManager");
        const instance = FolderViewManager.instance;
        
        if (fileSystem) {
            instance.fileSystem = fileSystem;
        }

        instance.clear();

        streamDeck.devices.onDeviceDidConnect((e) => {
            instance.addDevice(e.device.id);
        });

        streamDeck.devices.onDeviceDidDisconnect((e) => {
            instance.removeDevice(e.device.id);
        });

        return instance;
    }


    public addDevice(deviceId: string): void {
        if (this.devices.has(deviceId)) {
            this.removeDevice(deviceId);
        }

        this.devices.set(deviceId, new FolderView(deviceId, this.fileSystem));
    }

    public removeDevice(deviceId: string): void {
        const view = this.devices.get(deviceId);
        view?.destroy();

        this.devices.delete(deviceId);
    }

    public getFolderViewForDevice(deviceId: string): FolderView | undefined {
        return this.devices.get(deviceId);
    }

    public getAllFolderViews(): Map<string, FolderView> {
        return this.devices;
    }

    public clear(): void {
        this.devices.forEach((view) => view.destroy());
        this.devices.clear();
    }
}


