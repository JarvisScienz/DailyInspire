import { Component, OnInit, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { DatabaseService } from '../_services/database.service'

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
	registrationForm!: FormGroup;
	email: string = "";
	password: string = "";
	submitted = false;
	loading = false;
	focus = false;
	focus1 = false;
	focus2 = false;

	constructor(private afAuth: AngularFireAuth,
		private formBuilder: FormBuilder, private router: Router,
		private databaseService: DatabaseService) { }

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
		this.registrationForm = this.formBuilder.group({
			email: ['' ,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
			password: ['', [Validators.required, Validators.minLength(6)]] 
		});
		
		var body = document.getElementsByTagName("body")[0];
		body.classList.add("register-page");

		this.onMouseMove(event);	
	}
	
	get f() { return this.registrationForm.controls; }
	
	signup() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registrationForm.invalid) {
			return;
		}
		this.afAuth.createUserWithEmailAndPassword(this.f.email.value, this.f.password.value)
			.then(response => {
				console.log('User created successfully!', response);
				this.databaseService.assignUserRole(response.user!.uid, "user");
				this.router.navigate(["/profile"]);
			})
			.catch(error => {
				console.error('Error creating user:', error);
			});
	}
}