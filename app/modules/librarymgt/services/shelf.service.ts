import { Injectable } from '@angular/core';
import { IShelf, Shelf } from "~/modules/core/models/shelf.model";

@Injectable()
export class ShelfService {

    public getShelf(): Array<IShelf> {
        //@TODO: Get All the  list of available shelfs
        return new Array<IShelf>(new Shelf());
    }
}