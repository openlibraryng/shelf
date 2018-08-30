import { Injectable } from '@angular/core';

import { IUser } from "~/modules/core/models/user.model";
import { IBook } from "~/modules/core/models/book.model";
import { LibraryMgtService } from "~/modules/librarymgt/services/library-mgt.service";

@Injectable()
export class DashboardService {

    public getWatchListBooks(user: IUser): Array<IBook> {
        return this.libraryMgtService.getBooks(user, 'watchlist');
    }

    public getPendingBooks(user: IUser): Array<IBook> {
        return this.libraryMgtService.getBooks(user, 'active');
    }

    public getBooks(user: IUser): Array<IBook> {
        return this.libraryMgtService.getBooks(user);
    }

    constructor(private libraryMgtService: LibraryMgtService) {
    }
}