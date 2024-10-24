import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  // Aggiungi questo per Database
import { ReactiveFormsModule } from '@angular/forms';
//import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

import { HistoricalPhraseComponent } from './historical-phrase.component';
import { of } from 'rxjs';

const mockTranslateService = {
  get: (key: any) => of(key),  // Simula il metodo get restituendo semplicemente la chiave passata
  use: (lang: string) => {}
};

const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  databaseURL: 'https://fake-database-url.firebasedatabase.app',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-sender-id',
  appId: 'fake-app-id',
  measurementId: "fake-measurement-id"
};

describe('HistoricalPhraseComponent', () => {
  let component: HistoricalPhraseComponent;
  let fixture: ComponentFixture<HistoricalPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalPhraseComponent],
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),  // Inizializza Firebase
        AngularFireDatabaseModule  // Importa il modulo del database se usi il Realtime Database
      ],
      providers: [
        //{ provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
