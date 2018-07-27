import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from '~/pages/login/login.component';
import { RegisterComponent } from '~/pages/register/register.component';
import { OtpConfirmComponent } from '~/pages/otp-confirm/otp-confirm.component';
import { BooksComponent } from '~/pages/books/books.component';
import { BookDetailsComponent } from '~/pages/books/book-details/book-details.component';
import { UnitsComponent } from '~/pages/units/units.component';
import { UnitDetailsComponent } from '~/pages/units/unit-details/unit-details.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        OtpConfirmComponent,
        BooksComponent,
        BookDetailsComponent,
        UnitsComponent,
        UnitDetailsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
