import { IUser } from "~/modules/core/models/user.model";

export interface IComment {
    user: IUser;
    comment: string;
}