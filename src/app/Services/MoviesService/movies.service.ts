import { Injectable } from '@angular/core';
import { UserService } from '../UserService/user.service';
import { Movies } from 'src/app/Interfaces/movies';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from 'src/app/Interfaces/apiresponse';
import { AlertsService } from '../AlertsService/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(public User: UserService, private http: HttpClient, private Alerts: AlertsService) { }
  
  public movies: Movies[];
  public userMovies: Movies[];
  public genresArr: Array<string> = [];
  public genresUserArr: Array<string> = [];
  private isConnected: boolean = true;
  private isEmpty: boolean = true;
  public minRate: string = '1';
  public maxRate: string = '5';
  public minYear: string = '1888';
  public maxYear: string = '2022';
  public circle: number;
  public showTrailer: boolean = false;
  public trailer: '6xKgsdh6YRs';

  getMovies(){
    this.http.get("api/backend/user/getMovies.php").subscribe(async (data: Array<Movies>) => {
        this.movies = data;
        this.moviesGenre(this.movies,this.genresArr);
        // this.Alerts.showNotification("Połączono z bazą filmów!", null, 5000, "success");
        this.isConnected = false;
    });
  }

  moviesGenre(moviesArr: Movies[],genreArr: Array<string>) {

    var genres: string[];

    for (var movie of moviesArr) {

        genres = movie.genre.split(",");

        for (var genre of genres) {
            if (!genreArr.includes(genre)) {
                genreArr.push(genre);
            }
        }

    }
}

userAddRate(id: string, rate: number){
    this.http.post("api/backend/user/addRate.php", {
        userID: this.User.userID,
        movieID: id,
        rate: rate
    }).subscribe(async (data: APIResponse) => {
        this.Alerts.showNotification("Dodano ocenę!", null, 5000, "success");
    },error => {
        // this.Alerts.showNotification("Ten film został już dodany.", null, 5000, "danger");
    });
}

userAddMovies(id: string){
    this.http.post("api/backend/user/addMovie.php", {
        userID: this.User.userID,
        movieID: id
    }).subscribe(async (data: APIResponse) => {
        this.Alerts.showNotification("Polubiono!", null, 5000, "success");
    },error => {
        this.Alerts.showNotification("Ten film został już dodany.", null, 5000, "danger");
    });
}

userDeleteMovies(id: string){
    this.http.post("api/backend/user/deleteMovie.php", {
        userID: this.User.userID,
        movieID: id
    }).subscribe(async (data: APIResponse) => {
        this.Alerts.showNotification("Usunięto z kolekcji.", null, 5000, "warning");
    },error => {
        this.Alerts.showNotification("Ten film nie jest w kolekcji.", null, 5000, "danger");
    });
}

userGetMovies(){
    this.http.post("api/backend/user/getMovies.php", {
        userID: this.User.userID
    }).subscribe(async (data: Array<Movies>) => {
        this.userMovies = data;
        this.isEmpty  = false;
        this.isConnected = false;
        this.moviesGenre(this.userMovies,this.genresUserArr);
    },error => {
        this.isEmpty = true;
        this.userMovies = [];
    });
}

sortBy(forUser: boolean) {
    
    let forUserID = forUser ?  this.User.userID : null;

    this.http.post("api/backend/user/getMovies.php", {

        minRate: this.minRate,
        maxRate: this.maxRate,
        minYear: this.minYear,
        maxYear: this.maxYear,
        genreArr: this.User.sortGenresArr,
        userID: forUserID

    }).subscribe(async (data: Array<Movies>) => {
        if(forUser){
            this.userMovies = data;
        }else{
            this.movies = data;
        }
        this.isConnected = false;
    },error => {
        this.isConnected = true;
        if(forUser){
            this.userMovies = [];
        }else{
            this.movies = [];
        }
    });
}

showTrailerFunc(url){
    this.trailer = url;
    this.showTrailer = true;
}

genreButton() {
    if (this.User.genreReset) {
        return false;
    }
}

sortReset(forUser: boolean) {
    this.minRate = '0';
    this.maxRate = '5';
    this.minYear = '1888';
    this.maxYear = '2022';

    this.User.genreReset = !this.User.genreReset;
    this.User.sortGenresArr = [];

    this.sortBy(forUser);
}

deleteMovie(id){
    for(var i=0; i<this.userMovies.length; i++){
        if(this.userMovies[i]["id_movie"] == id){
            this.userMovies.splice(i,1);
        }
        
    }
}

}
