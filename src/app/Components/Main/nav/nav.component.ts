import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { LangService } from 'src/app/Services/LangService/lang.service';
import { HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
   trigger(
     'enterAnimation', [
       transition(':enter', [
         style({opacity: 0}),
         animate('200ms', style({opacity: 1}))
       ]),
       transition(':leave', [
         style({opacity: 1}),
         animate('200ms', style({opacity: 0}))
       ])
     ]
   )
 ],
})
export class NavComponent implements OnInit {
    Login: string;
    Password: string;
    contactShow = false;

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
         this.contactShow = true;
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
         this.contactShow = false;
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

