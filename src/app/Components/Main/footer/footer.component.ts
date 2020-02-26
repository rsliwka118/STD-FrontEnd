import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(private user: UserService) { }

    footerStyles() {
        let style;

        if (this.user.fooStyle) {
            style = {
                'background-color': 'rgba(0, 0, 0, 0.6)',
                'height': '30px',
                'margin-top': '-30px'
            };
        }
        else {
            style = {
                'background-color': 'rgb(59, 147, 230)',
                'height': '30px',
            };
        }

        return style;
    }

    ngOnInit() {
    }

}
