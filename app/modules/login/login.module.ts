import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptRouterModule} from 'nativescript-angular';

import {LoginRoutes} from './login.routes';
import {LoginComponent} from './components/login.component';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(<any>LoginRoutes)
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule {
}
