import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomPhraseComponent } from './random-phrase/random-phrase.component';
import { DailyPhraseComponent } from './daily-phrase/daily-phrase.component';
import { HistoricalPhraseComponent } from './historical-phrase/historical-phrase.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RandomPhraseComponent,
	DailyPhraseComponent,
	HistoricalPhraseComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
    AppRoutingModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	NgbModule,
	BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
