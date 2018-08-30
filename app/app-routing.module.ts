import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    // { path: "dashboard", loadChildren: "./modules/dashboard/dashboard.module#DashboardModule" },
    { path: "login", loadChildren: "./modules/login/login.module#LoginModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
