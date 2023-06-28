import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UsersComponent } from "../../pages/users/users.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { EndPointsComponent }   from '../../pages/endpoints/endpoints.component';
import { DailyPreparationsDetailsComponent } from "../../pages/daily-preparations-details/daily-preparations-details.component";
import { SmdPreparationsDetailsComponent } from "../../pages/smd-preparations-details/smd-preparations-details.component";
import { DevicesDetailsComponent } from "../../pages/devices-details/devices-details.component";
import { LogAnalyzerComponent } from "../../pages/log-analyzer/log-analyzer.component";
import { MachineStateDetailsComponent } from "../../pages/machine-state-details/machine-state-details.component";
import { CreateReportsComponent } from "../../pages/create-reports/create-reports.component";
import { MonthlyPreparationsDetailsComponent } from "../../pages/monthly-preparations-details/monthly-preparations-details.component";
import { MonthlySmdPreparationsDetailsComponent } from "../../pages/monthly-smd-preparations-details/monthly-smd-preparations-details.component";
import { DrugsDetailsComponent } from "../../pages/drugs-details/drugs-details.component";

import { ModalConfirmComponent } from "../../modal/example/modal-confirm.component";
import { BasicAuthInterceptor, ErrorInterceptor } from '../../_helpers';
import { JwtInterceptor } from '../../_helpers/jwt.interceptor';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
	ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
	NgMultiSelectDropDownModule,
	NgSelectModule,
	NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
	EndPointsComponent,
	DailyPreparationsDetailsComponent,
	SmdPreparationsDetailsComponent,
	DevicesDetailsComponent,
    LogAnalyzerComponent,
	MachineStateDetailsComponent,
	ModalConfirmComponent,
	CreateReportsComponent,
	MonthlyPreparationsDetailsComponent,
	MonthlySmdPreparationsDetailsComponent,
	DrugsDetailsComponent
  ],
	providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
   schemas:[NO_ERRORS_SCHEMA]
})
export class AdminLayoutModule {}
