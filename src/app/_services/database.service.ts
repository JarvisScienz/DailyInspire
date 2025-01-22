// phrase.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, query, orderByChild, equalTo, get, child, set, update, limitToLast, push } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhraseClass } from '../_models/PhraseClass';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databasePath = '/phrases';
  constructor(private db: AngularFireDatabase) {}

  // Metodo per ottenere tutte le frasi dalla collezione 'phrases'
  getAllPhrases(): Observable<any[]> {
    return this.db.list(this.databasePath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
      )
    );
  }

  // Metodo per ottenere frasi non pubblicate
  getAllPhrasesNotPublicated(): Observable<any> {
    return this.db.list(this.databasePath, ref =>
      ref.orderByChild('datePublication').equalTo(null) // Ordina per datePublication e prendi gli ultimi 5
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
      )
    );
  }

  // Metodo per ottenere frasi pubblicate in un determinato giorno
  getPhrasesPublicatedInDay(day: string): Observable<any> {
    return this.db.list(this.databasePath, ref =>
      ref.orderByChild('datePublication').equalTo(day) // Ordina per datePublication e prendi gli ultimi 5
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
      )
    );
  }

  // Metodo per ottenere frasi per un contributore specifico
  getPhrasesByContributor(contributorID: string): Observable<any> {
    return this.db.list(this.databasePath, ref =>
      ref.orderByChild('contributor').equalTo(contributorID) // Ordina per datePublication e prendi gli ultimi 5
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
      )
    );
  }

  // Metodo per ottenere frasi da approvare
  getPhrasesToApproved(): Observable<any[]> {
    return this.db.list(this.databasePath, ref =>
      ref.orderByChild('approved').equalTo(false) // Ordina per datePublication e prendi gli ultimi 5
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
      )
    );
  }

  // Metodo per aggiungere una frase
  addNewQuote(newQuote: PhraseClass): Promise<boolean> {
    const quotesRef = ref(this.db.database, 'phrases'); // Sostituisci 'phrases' con il percorso corretto se necessario
    const newQuoteRef = push(quotesRef); // Crea un nuovo riferimento univoco
    return set(newQuoteRef, newQuote) // Usa set() per inserire i dati
      .then(() => {
        console.log('Nuova quote inserita con successo');
        return true;
      })
      .catch((error) => {
        console.error('Errore durante l\'inserimento della quote:', error);
        return false;
      });
  }

  // Metodo per aggiornare una frase
  update(key: number, updatedQuote: any): Promise<void> {
    const quoteRef = ref(this.db.database, `phrases/${key}`);
    if ('key' in updatedQuote) {
      delete updatedQuote.key;
    }
    return update(quoteRef, updatedQuote)
    .then(() => {
      console.log('Quote aggiornata con successo');
    })
    .catch((error) => {
      console.error('Errore durante l\'aggiornamento della quote:', error);
    });
  }

  getLastNPhrases(index: number, lastDate?: string): Observable<any> {
    return this.db.list(this.databasePath, ref => {
      let query = ref.orderByChild('datePublication').limitToLast(index);
      if (lastDate) {
        query = query.endBefore(lastDate); // Carica i dati precedenti rispetto a "lastDate"
      }
      return query;
    }).snapshotChanges().pipe(
      map(changes =>
        changes
          .map(c => {
            // Converte il valore Firebase in un oggetto con una chiave e i dati associati
            const data = c.payload.val() as any; // Utilizziamo "as any" per accedere in modo dinamico
            return { key: c.payload.key, ...data };
          })
          .filter(item => item.datePublication !== undefined) // Filtro per escludere nodi senza "datePublication"
      ),
      map(data => data.reverse()) // Reverse per mantenere l'ordine cronologico
    );
  }
  

  // Metodo per controllare il ruolo di un utente
  checkUserRole(userUID: string): Promise<string | null> {
    const roleRef = ref(this.db.database, `users/${userUID}/role`);
    return get(roleRef).then(snapshot => snapshot.exists() ? snapshot.val() : null);
  }

  // Metodo per assegnare un ruolo a un utente
  assignUserRole(uid: string, role: string): Promise<void> {
    const roleRef = ref(this.db.database, `users/${uid}/role`);
    return set(roleRef, role);
  }

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

	getPayload(action: any) {
		return action.payload.val();
	}
}
