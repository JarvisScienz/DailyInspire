import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userId!: string;
	email!: string;
	/*private currentUserSubject: BehaviorSubject<User>;

	constructor(){
		this.currentUserSubject = new BehaviorSubject<User>();
	}
 	public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }*/

	setUserData(userId: string, email: string) {
		//this.currentUserSubject?.next(new User(userId, email));
		this.userId = userId;
		this.email = email;
	}

	getUserID() {
		return this.userId;
	}

	clearUserData() {
		this.userId = '';
		this.email = '';
	}
}