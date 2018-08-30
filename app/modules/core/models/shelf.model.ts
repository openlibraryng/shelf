import { IBook } from "~/modules/core/models/book.model";

export interface IShelf {
    name: string;
    long: number;
    lat: number;
    books: Array<IBook>;
}

export class Shelf implements IShelf{
    books: Array<IBook>;
    lat: number;
    long: number;
    name: string;
}