import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { OpenFolder } from "./actions/openFolder";
import { FileSystem } from "./filesystem/wrapper/impl/fileSystem";
import { FolderItemView } from "./actions/folderItemView";
import { FolderViewManager } from "./filesystem/streamdeck/devices/deviceManager";
import { NextPage } from "./actions/nextPage";
import { PrevPage } from "./actions/prevPage";
import { OpenParentFolder } from "./actions/openParentFolder";



streamDeck.logger.setLevel(LogLevel.INFO);


const filesystem = new FileSystem();


streamDeck.actions.registerAction(new OpenFolder(filesystem));
streamDeck.actions.registerAction(new OpenParentFolder());
streamDeck.actions.registerAction(new FolderItemView());
streamDeck.actions.registerAction(new NextPage());
streamDeck.actions.registerAction(new PrevPage());

streamDeck.connect().then(() => {
    streamDeck.logger.info("Connected to StreamDeck");

    FolderViewManager.init(filesystem);
});

