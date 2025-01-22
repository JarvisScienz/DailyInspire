import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';

import { DateService } from '../_services/date.service';
import { DatabaseService } from '../_services/database.service';

@Component({
	selector: 'app-daily-phrase',
	templateUrl: './historical-phrase.component.html',
	styleUrls: ['./historical-phrase.component.css']
})
export class HistoricalPhraseComponent implements OnInit {
	index: number = 5;
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
	disabledPrevButton: boolean = true;
	disabledNextButton: boolean = false;
	dbService: DatabaseService;
	lastDate?: string;

	constructor(private dateService: DateService,
		private injector: Injector) {
		this.todayDate = dateService.getCurrentDate();
		this.numberFromDate = dateService.getNumberDayOfTheYear();
		this.dbService = this.injector.get(DatabaseService);
	}

	ngOnInit() {
		this.loadHistoricalPhrases(this.todayDate);
		var body = document.getElementsByTagName("body")[0];
		body.classList.add("index-page");
	}

	scrollToDownload(element: any) {
		element.scrollIntoView({ behavior: "smooth" });
	}

	loadHistoricalPhrases(todayDate: string) {
		
		this.dbService.getLastNPhrases(this.index, todayDate).subscribe((data: any) => {
			this.phrases = data;
			this.selectDailyPhrase();
		});
	}

	loadMore(lastDate: string) {
		// if (this.loading) return; // Evita chiamate multiple contemporanee
		// this.loading = true;
	
		this.dbService.getLastNPhrases(this.index, lastDate).subscribe(data => {
		  if (data.length > 0) {
			this.lastDate = data[data.length - 1].datePublication; // Aggiorna l'ultima data
			this.phrases = [...this.phrases, ...data]; // Aggiungi le nuove frasi a quelle esistenti
			this.disabledNextButton = false;
		  }
		//   this.loading = false; // Fine caricamento
		}, error => {
		  console.error('Errore durante il caricamento delle frasi:', error);
		//   this.loading = false;
		});
	  }

	// testUpdate() {
	// 	const dbService = this.injector.get(DatabaseService);
	// 	var dateToUpdate = this.phrases[0];
	// 	dateToUpdate.datePublication = "20230622";
	// 	dbService.update(0, dateToUpdate);
	// }

	selectDailyPhrase() {
		this.quote = this.phrases[this.currentIndex].quote;
		this.author = this.phrases[this.currentIndex].author;
		this.datePublication = this.dateService.parseDateToItalianFormat(this.phrases[this.currentIndex].datePublication); 
	}

	previousIndex() {
		this.currentIndex = (this.currentIndex > 0) ? this.currentIndex-1 : 0;
		this.disabledPrevButton = (this.currentIndex == 0) ? true : false;
		this.disabledNextButton = false;
		this.selectDailyPhrase();
	}

	nextIndex() {
		this.currentIndex = (this.currentIndex < this.phrases.length) ? this.currentIndex+1 : this.phrases.length-1;
		this.disabledPrevButton = false;
		this.disabledNextButton = (this.currentIndex == this.phrases.length-1) ? true : false;
		if (this.disabledNextButton){
			this.loadMore(this.phrases[this.phrases.length-1].datePublication);
		}
		this.selectDailyPhrase();
	}

	/*writeRandomValueToFile(randomIndex: number) {
		const filePath = 'assets/historical-phrases.txt';

		fs.writeFile(filePath, randomIndex.toString(), (err) => {
			if (err) {
				console.error('Si � verificato un errore durante la scrittura del file:', err);
			} else {
				console.log('Valore casuale scritto correttamente nel file:', filePath);
			}
		});
	}*/
}