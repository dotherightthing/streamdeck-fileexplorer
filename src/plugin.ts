import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { OpenFolder } from "./actions/openFolder";
import { FileSystem } from "./filesystem/wrapper/impl/fileSystem";



streamDeck.logger.setLevel(LogLevel.TRACE);


const filesystem = new FileSystem();


streamDeck.actions.registerAction(new OpenFolder(filesystem));

streamDeck.connect()
