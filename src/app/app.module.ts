import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule , } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomPhraseComponent } from './random-phrase/random-phrase.component';
import { DailyPhraseComponent } from './daily-phrase/daily-phrase.component';
import { HistoricalPhraseComponent } from './historical-phrase/historical-phrase.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from '../environments/environment';
import { EmailComponent } from './email-service/email.component';

import { NavbarComponent } from './component/navbar/navbar.component';
import { ModalConfirmComponent } from './modal/confirm/modal-confirm.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
  }

@NgModule({
  declarations: [
    AppComponent,
    RandomPhraseComponent,
	DailyPhraseComponent,
	HistoricalPhraseComponent,
	RegistrationComponent,
	LoginComponent,
	NavbarComponent,
	ProfileComponent,
	ModalConfirmComponent,
	EmailComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
    AppRoutingModule,
	NgbModule,
	FormsModule,
	CommonModule,
	RouterModule,
	ReactiveFormsModule,
	BsDropdownModule.forRoot(),
	CollapseModule.forRoot(),
	TabsModule.forRoot(),
	TooltipModule.forRoot(),
	AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
	TranslateModule.forRoot({
		loader: {
		  provide: TranslateLoader,
		  useFactory: HttpLoaderFactory,
		  deps: [HttpClient]
		}
	})
  ],
  providers: [
	provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
	provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
