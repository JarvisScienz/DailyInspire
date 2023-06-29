import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookiesService } from '../_services/cookies.service';
import { AuthService } from '../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
		private cookiesService: CookiesService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.cookiesService.getCookie("userID");	
        if (!currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/profile'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}