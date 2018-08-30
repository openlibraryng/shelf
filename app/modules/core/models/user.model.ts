export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    memberType: string;
    status: boolean;
}

export class User implements IUser {
    email: string;
    firstName: string;
    lastName: string;
    memberType: string;
    phone: string;
    status: boolean;

}
