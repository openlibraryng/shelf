import { Injectable } from '@angular/core';
import { AuthService } from "~/modules/core/services";
import { IUser } from "~/modules/core/models/user.model";

@Injectable()
export class LoginService {

    constructor(private authService: AuthService) {
    }

    public login(User: IUser) {

    }

    public logout(User: IUser) {

    }
}