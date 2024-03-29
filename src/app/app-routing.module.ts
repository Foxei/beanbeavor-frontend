import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {AdminComponent} from "./pages/admin/admin/admin.component";
import {ActionComponent} from "./pages/user/action/action.component";

import {AuthenticationGuard} from "./services/authentication-guard.service";
import { AdminGuard } from './services/admin-guard.service';
import { KioskComponent } from './pages/kiosk/kiosk.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'action', component: ActionComponent},
  {path: 'kiosk', component: KioskComponent},

  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
