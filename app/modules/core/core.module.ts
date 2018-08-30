import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptRouterModule} from 'nativescript-angular';

import {CoreRoutes} from './core.routes';
import {CoreComponent} from './components/core.component';
import {CORE_SERVICES} from "~/modules/core/services";
import {DashboardModule} from "~/modules/dashboard/dashboard.module";

@NgModule({
    imports: [
        DashboardModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(<any>CoreRoutes)
    ],
    exports: [
        NativeScriptModule
    ],
    declarations: [
        CoreComponent
    ],
    providers: [
        ...CORE_SERVICES
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule {
}
