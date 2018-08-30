import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular';

import { FollowsRoutes } from './follows.routes';
import { FollowsComponent } from './components/follows.component';
import { FOLLOWS_SERVICE } from "~/modules/follows/services";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(<any>FollowsRoutes)
    ],
    declarations: [
        FollowsComponent
    ],
    providers: [
        ...FOLLOWS_SERVICE
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FollowsModule {
}
