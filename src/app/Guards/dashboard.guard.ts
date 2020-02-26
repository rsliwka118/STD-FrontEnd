import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/UserService/user.service'
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate 
{
    constructor(private userService: UserService, private router: Router) {};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
        let Value = this.userService.isLoggedIn.getValue();

        if(Value != undefined)
        {
            return Value;
        }
        
        // return this.userService.isLoggedIn.pipe(filter(n => n != undefined)).subscribe((data) => 
        // {
        //     if(data == true)
        //     {
        //         this.router.navigate([route.url.toString()]);
        //         return true;
        //     }
        //     else
        //     {
        //         this.router.navigate(['/login']);
        //         return false;
        //     }
            
        // });
        
    }

}


