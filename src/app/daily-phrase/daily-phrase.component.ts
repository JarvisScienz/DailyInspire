import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';
import { take } from 'rxjs';

@Component({
	selector: 'app-daily-phrase',
	templateUrl: './daily-phrase.component.html',
	styleUrls: ['./daily-phrase.component.css']
})
export class DailyPhraseComponent implements OnInit {
	isCollapsed = true;
	phrases: any = [];
	quote: string = '';
	author: string = '';
	todayDate;
	numberFromDate;
	focus: any;
	focus1: any;
	focus2: any;
	data: any;

	constructor(private dateService: DateService, 
		private injector: Injector) {
		this.todayDate = dateService.getCurrentDate();
		this.numberFromDate = dateService.getNumberDayOfTheYear();
	}

	ngOnInit() {
		this.loadPhrases();
		var body = document.getElementsByTagName("body")[0];
		body.classList.add("index-page");

	}

	ngOnDestroy() {
		var body = document.getElementsByTagName("body")[0];
		body.classList.remove("index-page");
	}

	scrollToDownload(element: any) {
		element.scrollIntoView({ behavior: "smooth" });
	}

	loadPhrases() {
		const dbService = this.injector.get(DatabaseService);
		dbService.getPhrasesPublicatedInDay(this.dateService.getCurrentDateNotParsed()).pipe(take(1)).subscribe(data => {
			if (data.length != 0){
				this.quote = data[0].quote;
				this.author = data[0].author;	
			}else{
				dbService.getAllPhrasesNotPublicated().pipe(take(1)).subscribe(data => {
					this.phrases = data;
					this.selectDailyPhrase(this.numberFromDate);
				});	
			}
				
		});
		
	}

	updateDateProduction(randomIndex: number) {
		const dbService = this.injector.get(DatabaseService);
		var dateToUpdate = this.phrases[randomIndex];
		dateToUpdate.datePublication = this.dateService.getCurrentDateNotParsed();
		dbService.update(dateToUpdate.key, dateToUpdate);
	}

	selectDailyPhrase(numberFromDate: number) {
		const randomIndex = numberFromDate % this.phrases.length;
		this.quote = this.phrases[randomIndex].quote;
		this.author = this.phrases[randomIndex].author;
		this.updateDateProduction(randomIndex);
	}
}