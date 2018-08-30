import { LibraryMgtService } from "~/modules/librarymgt/services/library-mgt.service";
import { ShelfService } from "~/modules/librarymgt/services/shelf.service";

export const LIBRARY_MGT_SERVICES = [
    LibraryMgtService,
    ShelfService
];

export * from './library-mgt.service'
export * from './shelf.service'