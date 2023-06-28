import { Routes } from '@angular/router';

import { LoginComponent } from "../../login/login.component";
import { LoginGuard } from '../../_helpers';

export const AuthLayoutRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];
