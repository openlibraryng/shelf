import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptRouterModule} from 'nativescript-angular';

import {DashboardRoutes} from './dashboard.routes';
import {DASHBOARD_COMPONENTS} from "~/modules/dashboard/components";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(<any>DashboardRoutes)
    ],
    declarations: [
        ...DASHBOARD_COMPONENTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule {
}
