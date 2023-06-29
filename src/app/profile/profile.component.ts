import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';
import { AuthService } from '../_services/auth.service';
import { CookiesService } from '../_services/cookies.service';

import { PhraseClass } from './../_models/PhraseClass';

import { ModalConfirmComponent } from './../modal/confirm/modal-confirm.component'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	addPhraseForm!: FormGroup;
	isCollapsed = true;
	phrases: any = [];
	quote: string = '';
	author: string = '';
	datePublication: string = '';
	todayDate;
	numberFromDate;
	focus: any;
	focus1: any;
	focus2: any;
	data: any;
	currentIndex: number = 0;
	userLoggedId!: string;
	emailUserLogged: string;
	phrase?: PhraseClass;
	adminIsLogged?: any;

	constructor(private http: HttpClient,
		private dateService: DateService,
		private databaseService: DatabaseService,
		private authService: AuthService,
		private cookiesService: CookiesService,
		private formBuilder: FormBuilder,
		private modalService: NgbModal) {
		this.todayDate = dateService.getCurrentDate();
		this.numberFromDate = dateService.getNumberDayOfTheYear();
		this.userLoggedId = this.cookiesService.getCookie("userID");
		this.emailUserLogged = this.cookiesService.getCookie("userEmail");
		//console.log("Admin is logged: " + adminIsLogged);
	}

	ngOnInit() {
		
		var body = document.getElementsByTagName("body")[0];
		body.classList.add("profile-page");

		this.addPhraseForm = this.formBuilder.group({
			quote: ['', Validators.required],
			author: ['', Validators.required]
		});

		
		this.isAdminLogged();
	}
	
	ngOnDestroy() {
		var body = document.getElementsByTagName("body")[0];
		body.classList.remove("profile-page");
	}

	async sendPhrase() {
		this.phrase = new PhraseClass(this.quote, this.author, '', this.userLoggedId, false);
		var result = await this.databaseService.addPhrase(this.phrase);
		if (result) {
			this.resetForm();
			this.openModalConfirm("Frase aggiunta", "Frase aggiunta");
		}
		else {
			this.openModalConfirm("Frase non aggiunta", "Frase non aggiunta");
		}
	}
	
	async isAdminLogged (){
		this.adminIsLogged = await this.databaseService.isAdminLogged(this.userLoggedId);
		
		if(this.adminIsLogged){
			this.loadPhrasesToApprove();
		}else{
			this.loadHistoricalPhrases();	
		}
	}

	loadHistoricalPhrases() {
		this.databaseService.getPhrasesByContributor(this.userLoggedId).subscribe(data => {
			this.phrases = data;
		});
	}

	loadPhrasesToApprove() {
		this.databaseService.getPhrasesToApproved().subscribe(data => {
			this.phrases = data;
		});
	}

	openModalConfirm(title: string, content: string) {
		const modalRef = this.modalService.open(ModalConfirmComponent);
		modalRef.componentInstance.my_modal_title = title;
		modalRef.componentInstance.my_modal_content = content;
	}

	resetForm() {
		this.quote = "";
		this.author = "";
	}

	getLabelApproved(value: boolean) {
		var label = (value) ? "Approvata" : "Non approvata";
		return label;
	}

	getClassApproved(value: boolean) {
		var classValue = (value) ? "btn btn-success btn-simple btn-round" : "btn btn-primary btn-simple btn-round";
		return classValue;
	}
	
	approvePhrase(phrase: any){
		phrase.approved = true;
		this.databaseService.update(phrase.id, phrase);
	}
}