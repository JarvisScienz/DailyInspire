import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { PhraseClass } from './../_models/PhraseClass';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private databasePath = '/phrases'; // Sostituisci con il percorso corretto nel tuo database
	quoteRef!: AngularFireObject<any>;

	constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) { }

	getAllData(): Observable<any> {
		const dataRef: AngularFireObject<any> = this.db.object(this.databasePath);
		return dataRef.valueChanges();
	}

	getAllPhrasesNotPublicated(): Observable<any> {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('datePublication').equalTo(null)
		);

		return listRef.valueChanges();
	}

	getPhrasesPublicatedInDay(day: string): Observable<any> {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('datePublication').equalTo(day)
		);

		return listRef.valueChanges();
	}

	getPhrasesByContributor(contributorID: string): Observable<any> {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('contributor').equalTo(contributorID)
		);

		return listRef.valueChanges();
	}

	async addPhrase(phrase: PhraseClass): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.auth.currentUser.then(user => {
				if (user) {
					this.db.list(this.databasePath).push(phrase)
						.then(() => {
							console.log('Inserimento avvenuto con successo');
							resolve(true); // Inserimento riuscito
						})
						.catch(error => {
							console.log('Errore durante l\'inserimento:', error);
							reject(false); // Inserimento fallito
						});
				} else {
					console.log('Utente non autenticato');
					reject(false); // Utente non autenticato, inserimento fallito
				}
			});
		});
	}

	update(key: number, quote: any): Promise<void> {
		this.quoteRef = this.db.object('phrases/' + key);
		return this.quoteRef.update(quote);
	}

	getLastNPhrases(index: number) {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('datePublication').limitToFirst(index)
		);

		return listRef.valueChanges();
	}
}