import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { CookiesService } from '../_services/cookies.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService, private cookiesService: CookiesService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {		
        //const currentUser = this.authenticationService.currentUserValue;
		const currentUser = this.cookiesService.getCookie("userID");	
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}