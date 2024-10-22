import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { CookiesService } from '../../_services/cookies.service'
import { AuthService } from '../../_services/auth.service'

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
	location: Location;
	mobile_menu_visible: any = 0;
	public isCollapsed = true;
	closeResult!: string;
	userLogged = false;//new BehaviorSubject(false);
	isLoggedIn?: boolean;

	constructor(
		location: Location,
		private authService: AuthService, private cookiesService: CookiesService) {
		this.location = location;

	}

	ngOnInit() {
		this.authService.isLoggedIn$.subscribe(isLoggedIn => {
			console.log ("Cookie: " + this.cookiesService.getCookie("userID"));
			//console.log ("CurrentValue: " + this.authService.currentUserValue());
			var isLogged = (this.cookiesService.getCookie("userID") != "") ? true : false;
			if (isLogged) {
				this.userLogged = isLogged;
			} else {
				this.userLogged = isLoggedIn;
			}

			// Puoi eseguire altre operazioni qui in base allo stato di autenticazione
			// ...
		});
	}

collapse() {
	this.isCollapsed = !this.isCollapsed;
	const navbar = document.getElementsByTagName("nav")[0];
	if (!this.isCollapsed) {
		navbar.classList.remove("navbar-transparent");
		navbar.classList.add("bg-white");
	} else {
		navbar.classList.add("navbar-transparent");
		navbar.classList.remove("bg-white");
	}
}

setCollapsed() {
	this.isCollapsed = !this.isCollapsed;
}

logout() {
	this.authService.logout();
}

ngOnDestroy() {

}
}
