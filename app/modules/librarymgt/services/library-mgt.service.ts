import { Injectable } from '@angular/core';
import { IUser } from "~/modules/core/models/user.model";
import { IBook, Book } from "~/modules/core/models/book.model";

@Injectable()
export class LibraryMgtService {

    constructor() {
    }

    /**
     * Get's the user's books from the database based on type
     * @param user IUser
     * @param type (watchlist | active | all)
     */
    public getBooks(user: IUser, type: string = 'all') {
        switch (type) {
            case 'watchlist':
                return this.getWatchListBooks(user);
            case 'active':
                return this.getActiveBooks(user);
            case 'all':
            default:
                this.getAllBooks(user);
                break;
        }
    }

    private getWatchListBooks(user: IUser): Array<IBook> {
        //@TODO: Get the watchlist file for this user
        return new Array(new Book());
    }

    private getActiveBooks(user: IUser): Array<IBook> {
        //@TODO: Get the active (checkout) books for this user
        return new Array(new Book());

    }

    private getAllBooks(user: IUser): Array<IBook> {
        //@TODO: Get all the available books the user has access to broken with genres
        return new Array(new Book());
    }
}