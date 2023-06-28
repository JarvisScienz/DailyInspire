import { Routes } from "@angular/router";

import { EndPointsComponent } from "../../pages/endpoints/endpoints.component";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UsersComponent } from "../../pages/users/users.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { DailyPreparationsDetailsComponent } from "../../pages/daily-preparations-details/daily-preparations-details.component";
import { SmdPreparationsDetailsComponent } from "../../pages/smd-preparations-details/smd-preparations-details.component";
import { DevicesDetailsComponent } from "../../pages/devices-details/devices-details.component";
import { LogAnalyzerComponent } from "../../pages/log-analyzer/log-analyzer.component";
import { MachineStateDetailsComponent } from "../../pages/machine-state-details/machine-state-details.component";
import { CreateReportsComponent } from "../../pages/create-reports/create-reports.component";
import { MonthlyPreparationsDetailsComponent } from "../../pages/monthly-preparations-details/monthly-preparations-details.component";
import { MonthlySmdPreparationsDetailsComponent } from "../../pages/monthly-smd-preparations-details/monthly-smd-preparations-details.component";
import { DrugsDetailsComponent } from "../../pages/drugs-details/drugs-details.component";

import { AuthGuard } from '../../_helpers';

export const AdminLayoutRoutes: Routes = [
	{ path: "endpoints", component: EndPointsComponent, canActivate: [AuthGuard]},
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
	{ path: "icons", component: IconsComponent, canActivate: [AuthGuard]},
	{ path: "maps", component: MapComponent, canActivate: [AuthGuard]},
	{ path: "notifications", component: NotificationsComponent, canActivate: [AuthGuard]},
	{ path: "users", component: UsersComponent, canActivate: [AuthGuard]},
	{ path: "tables", component: TablesComponent, canActivate: [AuthGuard]},
	{ path: "typography", component: TypographyComponent, canActivate: [AuthGuard]},
	{ path: "dailyPreparationsDetails", component: DailyPreparationsDetailsComponent, canActivate: [AuthGuard]},
	{ path: "dailySMDDetails", component: SmdPreparationsDetailsComponent, canActivate: [AuthGuard]},
	{ path: "devicesDetails", component: DevicesDetailsComponent, canActivate: [AuthGuard]},
	{ path: 'log-analyzer',        component: LogAnalyzerComponent , canActivate: [AuthGuard]},
	{ path: 'machineStatusDetails',        component: MachineStateDetailsComponent , canActivate: [AuthGuard]},
	{ path: 'create-reports',        component: CreateReportsComponent , canActivate: [AuthGuard]},
	{ path: 'monthlyPreparationsDetails',        component: MonthlyPreparationsDetailsComponent , canActivate: [AuthGuard]},
	{ path: 'monthlySMDDetails',        component: MonthlySmdPreparationsDetailsComponent , canActivate: [AuthGuard]},
	{ path: 'drugsDetails',        component: DrugsDetailsComponent , canActivate: [AuthGuard]}
];
