import { Component, OnInit } from '@angular/core';
import { LoginService } from "~/modules/login/services/login.service";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private  loginService: LoginService) {
    }
    

    ngOnInit() {
    }

}
