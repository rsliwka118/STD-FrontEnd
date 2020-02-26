import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { Movies } from 'src/app/Interfaces/movies';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from 'src/app/Interfaces/apiresponse';
import { AlertsService } from 'src/app/Services/AlertsService/alerts.service';
import { Options, LabelType } from 'ng5-slider';
import { MoviesService } from 'src/app/Services/MoviesService/movies.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    constructor(public Movie: MoviesService, public user: UserService, private http: HttpClient, private Alerts: AlertsService) {
    }

    private conditDrop: boolean = false;
    optionsRate: Options = {
        floor: 1,
        ceil: 5,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Ocena od: </b>' + value;
                case LabelType.High:
                    return '<b>Ocena do: </b>' + value;
                default:
                    return '' + value;
            }
        }
    };

    optionsYear: Options = {
        floor: 1888,
        ceil: 2022,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Rok od: </b>' + value;
                case LabelType.High:
                    return '<b>Rok do: </b>' + value;
                default:
                    return '' + value;
            }
        }
    };
    
    ngOnInit() {
        this.Movie.getMovies();
    }

}
