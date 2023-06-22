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
	randomPhrase: string = '';
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
		this.loadPhrases(this.numberFromDate);
		var body = document.getElementsByTagName("body")[0];
	    body.classList.add("index-page");
		
	}
	
	

	scrollToDownload(element: any) {
		element.scrollIntoView({ behavior: "smooth" });
	}

	loadPhrases(numberFromDate: number) {
		this.databaseService.getAllData().subscribe(data => {
      		this.phrases = data;
				this.selectDailyPhrase(numberFromDate);
    	});
	}
	
	testUpdate(){
		var dateToUpdate = this.phrases[0];
		dateToUpdate.datePublication = "20230622";
		this.databaseService.update(0, dateToUpdate);
	}

	selectDailyPhrase(numberFromDate: number) {
		const randomIndex = numberFromDate % this.phrases.length;
		this.randomPhrase = this.phrases[randomIndex].quote;
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