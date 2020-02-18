import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../services/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private navigationService: NavigationService, private router: Router, private toast: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const splitUrl = state.url.split('/');
        const routeTab = splitUrl[splitUrl.length - 1]

        let hasRole = this.navigationService.hasRole(...this.navigationService.getTabRoles(routeTab));
        if (hasRole) {
            return true;
        } else {
            this.toast.error('Unauthorized !', 'Access denied !');
            this.router.navigate(['/access-denied']);
            return false;
        }
    }
}
