import { Component, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../_services/auth.service'
import { CookiesService } from '../_services/cookies.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	loginForm!: FormGroup;
	loading = false;
	submitted = false;
	returnUrl!: string;
	wrongCredential = false;
	focus = false;
	focus1 = false;
	focus2 = false;

	constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private authService: AuthService,
	private router: Router, private cookiesservice:CookiesService) { }

	@HostListener("document:mousemove", ["$event"])
	onMouseMove(e: any) {
		var squares1 = document.getElementById("square1");
		var squares2 = document.getElementById("square2");
		var squares3 = document.getElementById("square3");
		var squares4 = document.getElementById("square4");
		var squares5 = document.getElementById("square5");
		var squares6 = document.getElementById("square6");
		var squares7 = document.getElementById("square7");
		var squares8 = document.getElementById("square8");

		var posX = e.clientX - window.innerWidth / 2;
		var posY = e.clientY - window.innerWidth / 6;

		squares1!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares2!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares3!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares4!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares5!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares6!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.05 +
			"deg) rotateX(" +
			posY * -0.05 +
			"deg)";
		squares7!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.02 +
			"deg) rotateX(" +
			posY * -0.02 +
			"deg)";
		squares8!.style.transform =
			"perspective(500px) rotateY(" +
			posX * 0.02 +
			"deg) rotateX(" +
			posY * -0.02 +
			"deg)";
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
		
		var body = document.getElementsByTagName("body")[0];
		body.classList.add("register-page");

		this.onMouseMove(event);

		
	}
	ngOnDestroy() {
		var body = document.getElementsByTagName("body")[0];
		body.classList.remove("register-page");
	}

	get f() { return this.loginForm.controls; }

	login() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		this.afAuth.signInWithEmailAndPassword(this.f.email.value, this.f.password.value)
			.then(response => {
				this.loading = false;
				console.log('User logged in successfully!', response);
				//this.authService.setUserData(response.user!.uid, this.f.email.value);
				this.cookiesservice.setCookie("userID", response.user!.uid, 2);
				this.cookiesservice.setCookie("userEmail", this.f.email.value, 2);
				this.router.navigate(["/profile"]);
				// Puoi eseguire altre operazioni dopo il login dell'utente
			})
			.catch(error => {
				this.loading = false;
				this.wrongCredential = true;
				console.error('Error logging in:', error);
			});
	}
}