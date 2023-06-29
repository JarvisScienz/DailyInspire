import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
	getCurrentDate(): string {
		const today = new Date();

		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0'); // Mese numerato da 0 a 11
		const year = today.getFullYear();

		return `${day}/${month}/${year}`;
	}

	getCurrentDateNotParsed(): string {
		const today = new Date();

		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0'); // Mese numerato da 0 a 11
		const year = today.getFullYear();

		return `${year}${month}${day}`;
	}

	getNumberDayOfTheYear(): number {
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 0);
		const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
		const oneDay = 1000 * 60 * 60 * 24;
		const day = Math.floor(diff / oneDay);

		return day;
	}

	parseDateToItalianFormat(dateString: string): string {
		var dateParsed = "";
		if (dateString.length >= 8){ 
			const year = dateString.substr(0, 4);
			const month = dateString.substr(4, 2);
			const day = dateString.substr(6, 2);
			dateParsed = `${day}/${month}/${year}`
		}
		
		return dateParsed;
	}
}	