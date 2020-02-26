import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { LangService } from 'src/app/Services/LangService/lang.service';
import { AlertsService } from 'src/app/Services/AlertsService/alerts.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from 'src/app/Interfaces/apiresponse';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public User: UserService, private http: HttpClient, private router: Router, public lang: LangService, private Alerts: AlertsService) { }

    public login: string = '';
    public password: string = '';

    ngOnInit() {
        this.User.fooStyle = true;
    }

    log() {

        this.http.post("api/backend/user/login.php", { username: this.login, password: this.password }).subscribe(async (data: APIResponse) => {
            this.Alerts.showNotification("Zalogowano pomyślnie!", null, 5000, "success");
            this.router.navigate(['/dashboard']);
            this.User.login = data.username;
            this.User.userID = data.userID;
            this.User.showNav = true;
            this.User.isLoggedIn.next(true);
         
        });
        this.User.getDetails();
    }
}