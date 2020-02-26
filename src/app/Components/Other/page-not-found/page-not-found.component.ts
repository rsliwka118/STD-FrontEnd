import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
    this.user.showNav = true;
    this.user.fooStyle = true;
  }

}
