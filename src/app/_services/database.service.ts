import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private databasePath = '/phrases'; // Sostituisci con il percorso corretto nel tuo database
	quoteRef!: AngularFireObject<any>;

	constructor(private db: AngularFireDatabase) { }

	getAllData(): Observable<any> {
		const dataRef: AngularFireObject<any> = this.db.object(this.databasePath);
		return dataRef.valueChanges();
	}

	/*create(tutorial: Tutorial): any {
		return this.tutorialsRef.push(tutorial);
	}*/

	update(key: number, quote: any): Promise<void> {
		this.quoteRef = this.db.object('phrases/' + key);
		return this.quoteRef.update(quote);
	}
	
	getLastNPhrases(index: number){
		const listRef = this.db.list(this.databasePath, (ref) =>
      		ref.orderByChild('datePublication').limitToLast(index)
		);

    	return listRef.valueChanges();
	}
}