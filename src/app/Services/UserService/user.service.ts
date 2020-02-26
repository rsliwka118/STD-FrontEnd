import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from 'src/app/Interfaces/apiresponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../AlertsService/alerts.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,private router: Router, private Alerts: AlertsService) { }
    //  public isLoggedIn: boolean=false; 
    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
    public showNav: boolean = true;
    public fooStyle: boolean = true;
    public login: string = '';
    public userID: string = '';
    public genreReset: boolean = false;
    public sortGenresArr: Array<string> = [];
    public userAddedCount: number = null;
    public userRateCount: number = null;
    public userCommentCount: number = null;
    public userAvrRate: number = null;
    public addedCount: number = null;

    Init() {
        this.getDetails();
    }

    getDetails(){
        this.http.get("api/backend/user/details.php").subscribe(async (data: APIResponse) => {
            this.login = data.username;
            this.userID = data.userID;
            this.userAddedCount = data.userAddedCount;
            this.userRateCount = data.userRateCount;
            this.userCommentCount = data.userCommentCount;
            this.userAvrRate = data.userAvrRate;
            this.addedCount = data.addedCount;
            this.isLoggedIn.next(true);
            this.Alerts.showNotification("Witaj ponownie "+this.login+"!", null, 5000, "success");
        }, error => {
            this.isLoggedIn.next(false);
        });
    }

    sortGenreAdd(genre: string) {

        if (!this.sortGenresArr.includes(genre)) {
            this.sortGenresArr.push(genre);
        }
        else{
            this.sortGenresArr.splice(this.sortGenresArr.indexOf(genre),1);
        }
    }

    logOut(){
        this.http.post("api/backend/user/logout.php", {}).subscribe(data => {
            this.login = '';
            this.userID = '';
            this.router.navigate(['/login']);
            this.isLoggedIn.next(false);
            
        });
    }

}
