import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/Services/LangService/lang.service';
import { UserService } from 'src/app/Services/UserService/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private lang: LangService, public User: UserService) {
      
  }

  ngOnInit() {
    this.User.fooStyle = false;
  }

}
