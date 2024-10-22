import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injector } from '@angular/core';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';
import { CookiesService } from '../_services/cookies.service';

import { PhraseClass } from './../_models/PhraseClass';

import { ModalConfirmComponent } from './../modal/confirm/modal-confirm.component'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	addPhraseForm!: UntypedFormGroup;
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

	constructor(private dateService: DateService,
		private cookiesService: CookiesService,
		private formBuilder: UntypedFormBuilder,
		private modalService: NgbModal,
		private injector: Injector) {
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
		const dbService = this.injector.get(DatabaseService);
		this.phrase = new PhraseClass(this.quote, this.author, '', this.userLoggedId, false);
		var result = await dbService.addNewQuote(this.phrase);
		if (result) {
			this.resetForm();
			this.openModalConfirm("Frase aggiunta", "Frase aggiunta");
		}
		else {
			this.openModalConfirm("Frase non aggiunta", "Frase non aggiunta");
		}
	}
	
	async isAdminLogged (){
		const dbService = this.injector.get(DatabaseService);
		this.adminIsLogged = await dbService.isAdminLogged(this.userLoggedId);
		
		if(this.adminIsLogged){
			this.loadPhrasesToApprove();
		}else{
			this.loadHistoricalPhrases();	
		}
	}

	loadHistoricalPhrases() {
		const dbService = this.injector.get(DatabaseService);
		dbService.getPhrasesByContributor(this.userLoggedId).subscribe(data => {
			this.phrases = data;
		});
	}

	loadPhrasesToApprove() {
		const dbService = this.injector.get(DatabaseService);
		dbService.getPhrasesToApproved().subscribe(data => {
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
		const dbService = this.injector.get(DatabaseService);
		phrase.approved = true;
		dbService.update(phrase.key, phrase);
	}
}