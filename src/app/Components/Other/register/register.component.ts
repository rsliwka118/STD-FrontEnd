import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/Services/LangService/lang.service';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from 'src/app/Interfaces/apiresponse';
import { UserService } from 'src/app/Services/UserService/user.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/Services/AlertsService/alerts.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(public User: UserService, public lang: LangService, private http: HttpClient, private router: Router, private Alerts: AlertsService) { }

    public login: string = '';
    public password: string = '';
    public email: string = '';
    public acceptrules: boolean = false;

    ngOnInit() {
        this.User.showNav = true;
        this.User.fooStyle = true;
    }

    reg() {
        this.http.post("api/backend/user/register.php", { username: this.login, email: this.email, password: this.password }).subscribe(async (data: APIResponse) => {
            this.Alerts.showNotification("Zarejestrowano pomyślnie!", null, 5000, "success");
            this.router.navigate(['/login']);
        });

    }
}

