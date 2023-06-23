import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';

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

	constructor(private http: HttpClient,
		private dateService: DateService,
		private databaseService: DatabaseService) {
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

	setCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}

	scrollToDownload(element: any) {
		element.scrollIntoView({ behavior: "smooth" });
	}

	loadPhrases() {
		this.databaseService.getPhrasesPublicatedInDay(this.dateService.getCurrentDateNotParsed()).subscribe(data => {
			if (data.length != 0){
				this.quote = data[0].quote;
				this.author = data[0].author;	
			}else{
				this.databaseService.getAllPhrasesNotPublicated().subscribe(data => {
					this.phrases = data;
					this.selectDailyPhrase(this.numberFromDate);
				});	
			}
				
		});
		
	}

	updateDateProduction() {
		var dateToUpdate = this.phrases[0];
		dateToUpdate.datePublication = this.dateService.getCurrentDateNotParsed();
		this.databaseService.update(0, dateToUpdate);
	}

	selectDailyPhrase(numberFromDate: number) {
		const randomIndex = numberFromDate % this.phrases.length;
		this.quote = this.phrases[randomIndex].quote;
		this.author = this.phrases[randomIndex].author;
		this.updateDateProduction();
	}

	/*writeRandomValueToFile(randomIndex: number) {
		const filePath = 'assets/historical-phrases.txt';

		fs.writeFile(filePath, randomIndex.toString(), (err) => {
			if (err) {
				console.error('Si è verificato un errore durante la scrittura del file:', err);
			} else {
				console.log('Valore casuale scritto correttamente nel file:', filePath);
			}
		});
	}*/
}