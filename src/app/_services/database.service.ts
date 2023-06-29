import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

	/*getPhrasesToApproved(): Observable<any> {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('approved').equalTo(false)
		);

		return listRef.valueChanges();
	}*/

	getPhrasesToApproved(): Observable<any[]> {
		const listRef = this.db.list(this.databasePath, (ref) =>
			ref.orderByChild('approved').equalTo(false)
		);

		return listRef.snapshotChanges().pipe(
			map(actions =>
				actions.map(action => ({
					id: action.key,
					// ...action.payload.val()
					quote: this.getPayload(action).quote,
					approved: this.getPayload(action).approved,
					author: this.getPayload(action).author,
					contributor: this.getPayload(action).contributor,
				}))
			)
		);
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
			ref.orderByChild('datePublication')
				.startAt(null)
				.limitToLast(index)
		);

		return listRef.valueChanges();
	}

	checkUserRole(userUID: string): Promise<string | null> {
		return new Promise<string | null>((resolve, reject) => {
			this.db.object(`users/${userUID}/role`).valueChanges().subscribe(
				role => {
					resolve(role as string);
				},
				error => {
					reject(error);
				}
			);
		});
	}

	/*isAdminLogged(userUID: string) {
		return (this.checkUserRole(userUID) == "admin") ? true : false;
	}*/
	async isAdminLogged(userUID: string) {
		var adminLogged = false;
		try {
			const userRole = await this.checkUserRole(userUID);

			if (userRole === 'admin') {
				adminLogged = true;
			} else {
				console.log('Utente non autenticato o ruolo non riconosciuto');
			}
		} catch (error) {
			console.log('Errore durante il controllo del ruolo utente:', error);
		}
		return adminLogged;
	}

	assignUserRole(uid: string, role: string): Promise<void> {
		return this.db.object(`users/${uid}/role`).set(role);
	}


	getPayload(action: any) {
		return action.payload.val();
	}
}

