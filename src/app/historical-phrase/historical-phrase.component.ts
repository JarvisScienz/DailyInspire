import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';

@Component({
	selector: 'app-daily-phrase',
	templateUrl: './historical-phrase.component.html',
	styleUrls: ['./historical-phrase.component.css']
})
export class HistoricalPhraseComponent implements OnInit {
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
		this.loadHistoricalPhrases();
		var body = document.getElementsByTagName("body")[0];
	    body.classList.add("index-page");
	}
	
	

	scrollToDownload(element: any) {
		element.scrollIntoView({ behavior: "smooth" });
	}

	loadHistoricalPhrases() {
		this.databaseService.getLastNPhrases(3).subscribe(data => {
      		this.phrases = data;
			this.selectDailyPhrase();
    	});
	}
	
	testUpdate(){
		var dateToUpdate = this.phrases[0];
		dateToUpdate.datePublication = "20230622";
		this.databaseService.update(0, dateToUpdate);
	}

	selectDailyPhrase() {
		this.randomPhrase = this.phrases[1].quote;
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