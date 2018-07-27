import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '~/pages/login/login.component';
import { BooksComponent } from '~/pages/books/books.component';
import { BookDetailsComponent } from '~/pages/books/book-details/book-details.component';
import { UnitsComponent } from '~/pages/units/units.component';
import { UnitDetailsComponent } from '~/pages/units/unit-details/unit-details.component';
import { OtpConfirmComponent } from '~/pages/otp-confirm/otp-confirm.component';
import { RegisterComponent } from '~/pages/register/register.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'otp-confirm', component: OtpConfirmComponent },
    { path: 'books', component: BooksComponent },
    { path: 'books/:id', component: BookDetailsComponent },
    { path: 'units', component: UnitsComponent },
    { path: 'unit/:id', component: UnitDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
