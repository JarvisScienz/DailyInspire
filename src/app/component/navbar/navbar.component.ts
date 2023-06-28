import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { CookiesService } from '../../_services/cookies.service'

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
	userLogged = false;

	constructor(
		location: Location,
		private cookiesService: CookiesService,
		private afAuth: AngularFireAuth,
		private router: Router) {
		this.location = location;

	}

	ngOnInit() {
		this.userLogged = (this.cookiesService.getCookie("userID") != "") ? true : false;

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
		this.afAuth.signOut()
			.then(() => {
				this.cookiesService.setCookie("userID", "", 2);
				this.cookiesService.setCookie("userEmail", "", 2);
				this.router.navigate(["/daily-phrase"]);
			})
			.catch(error => {
				console.error('Error logging out:', error);
			});
	}

	ngOnDestroy() {

	}
}
