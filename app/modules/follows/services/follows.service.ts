import { Injectable } from '@angular/core';
import { IUser, User } from "~/modules/core/models/user.model";

@Injectable()
export class FollowsService {

    public getFollowing(user: IUser): Array<IUser> {
        //@TODO: Get users being followed
        return new Array<IUser>(new User());
    }

    public getFollowers(users: IUser): Array<IUser> {
        //@TODO: Get users following users
        return new Array<IUser>(new User());
    }

    public follow(user: IUser): void {
        //@TODO: Follow a user

    }

    public unfollow(user): void {
        //@TODO: Unfollow a user
    }

    constructor() {
    }
}