import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertsService } from 'src/app/Services/AlertsService/alerts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
    constructor(public User: UserService, private Alerts: AlertsService) {
      }
      
    ngOnInit() {
        this.User.Init();
       
 }
      
}
