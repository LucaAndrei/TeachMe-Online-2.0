import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router,
        private jwtService: JwtService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const currentUser = this.userService.currentUser;
        const tokenExpired = this.jwtService.isTokenExpired();

        if (currentUser && !tokenExpired) {
            return true;
        } else {
            this.router.navigate(['logout']);
            return false;
        }
    }
}
