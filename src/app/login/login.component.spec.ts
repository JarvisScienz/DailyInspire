import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { LoginComponent } from './login.component';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { CookiesService } from '../_services/cookies.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return {
    getTranslation: () => of({})  // Mock delle traduzioni
  };
}

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  // Creiamo dei mock per le dipendenze
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCookiesService: jasmine.SpyObj<CookiesService>;
  let mockAuth: jasmine.SpyObj<Auth>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'logout']); // Metodi esemplificativi
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCookiesService = jasmine.createSpyObj('CookiesService', ['set', 'get', 'delete']);
    mockAuth = jasmine.createSpyObj('Auth', ['signInWithEmailAndPassword', 'signOut']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot({  // Configurazione del TranslateModule
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: Auth, useValue: mockAuth },
        HttpClient,
        HttpHandler,
        TranslateService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have invalid form when empty', () => {
  //   expect(component.loginForm.valid).toBeFalsy();
  // });

  // it('should validate email field', () => {
  //   const email = component.loginForm.controls['email'];
  //   expect(email.valid).toBeFalsy();

  //   email.setValue('d.scill@gmail.com');
  //   expect(email.hasError('email')).toBeTruthy();

  //   email.setValue('d.scilletta@gmail.com');
  //   expect(email.hasError('email')).toBeFalsy();
  // });

  // it('should call login method when form is valid', () => {
  //   component.loginForm.controls['email'].setValue('valid.email@test.com');
  //   component.loginForm.controls['password'].setValue('validpassword');

  //   component.login();
  //   expect(component.login).toHaveBeenCalledWith('valid.email@test.com', 'validpassword');
  // });
});