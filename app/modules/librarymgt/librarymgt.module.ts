import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular';

import { LibrarymgtRoutes } from './librarymgt.routes';
import { LibrarymgtComponent } from './components/librarymgt.component';
import { LIBRARY_MGT_SERVICES } from "~/modules/librarymgt/services";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(<any>LibrarymgtRoutes)
    ],
    declarations: [
        LibrarymgtComponent
    ],
    providers: [
        ...LIBRARY_MGT_SERVICES
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LibrarymgtModule {
}
