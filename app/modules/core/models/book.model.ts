import { IComment } from "~/modules/core/models/comment.model";
import { IShelf } from "~/modules/core/models/shelf.model";

export interface IBook {
    title: string;
    isbn: string;
    author: string;
    format: string;
    rating: number;
    shelf?: IShelf;
    genre: string;
    status: string; // "available" | "taken" | "pending"
    comments: Array<IComment>
}

export class Book implements IBook {
    author: string;
    comments: Array<IComment>;
    format: string;
    genre: string;
    isbn: string;
    rating: number;
    title: string;
    shelf: IShelf;
    status: string;
}