import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Auth} from '@angular/fire/auth';

import { User } from '../_models/user';
import { CookiesService } from '../_services/cookies.service'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userId!: string;
	email!: string;
	private currentUserSubject?: BehaviorSubject<User>;
	private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  	isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

	constructor(
		private afAuth: Auth, private cookiesService: CookiesService,
		private router: Router){
	}
 	public get currentUserValue(): any {
        //return this.currentUserSubject?.value;
		return this.isLoggedInSubject.value;
    }

	setUserData(userId: string, email: string) {
		var user = new User(userId, email);
		//this.currentUserSubject?.next(user);
		this.userId = userId;
		this.email = email;
		this.isLoggedInSubject.next(true);
	}

	getUserID() {
		return this.userId;
	}

	clearUserData() {
		this.userId = '';
		this.email = '';
	}
	
	logout (){
		this.afAuth.signOut()
			.then(() => {
				this.cookiesService.setCookie("userID", "", 2);
				this.cookiesService.setCookie("userEmail", "", 2);
				this.isLoggedInSubject.next(false);
				this.router.navigate(["/daily-phrase"]);
			})
			.catch((error: any) => {
				console.error('Error logging out:', error);
			});
		//this.currentUserSubject?.next(new User("", ""));
	}
}