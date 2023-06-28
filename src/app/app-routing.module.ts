import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomPhraseComponent } from './random-phrase/random-phrase.component';
import { DailyPhraseComponent } from './daily-phrase/daily-phrase.component';
import { HistoricalPhraseComponent } from './historical-phrase/historical-phrase.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/daily-phrase', pathMatch: 'full' },
	{ path: "random-phrase", component: RandomPhraseComponent },
	{ path: "daily-phrase", component: DailyPhraseComponent },
	{ path: "historical", component: HistoricalPhraseComponent },
	{ path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: "login", component: LoginComponent },
	{ path: "registration", component: RegistrationComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
