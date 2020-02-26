import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { LangService } from 'src/app/Services/LangService/lang.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    Login: string;
    Password: string;

    constructor(public User: UserService, public lang: LangService) {
       }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])

      onWindowScroll(e) {
      let navbar = document.querySelector('.navbar');
      let logo = document.querySelectorAll('.logo');
      let border = document.querySelectorAll('.nav-item');
      let text = document.querySelectorAll('.nav-link');
      if (window.pageYOffset > navbar.clientHeight) {
         navbar.classList.add('navbar-inverse');
         [].forEach.call(logo, logoEl => {
          logoEl.classList.add('logo-inverse');
         });
         [].forEach.call(border, borderEl => {
            borderEl.classList.add('nav-item-inverse');
         });
         [].forEach.call(text, textEl => {
            textEl.classList.add('nav-link-inverse');
         });
      } else {
         navbar.classList.remove('navbar-inverse');
         [].forEach.call(logo, logoEl => {
         logoEl.classList.remove('logo-inverse');
         });
         [].forEach.call(border, borderEl => {
            borderEl.classList.remove('nav-item-inverse');
         });
         [].forEach.call(text, textEl => {
            textEl.classList.remove('nav-link-inverse');
         });
      }
   }

 }

