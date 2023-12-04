import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {AdminComponent} from "./pages/admin/admin/admin.component";
import {UploadComponent} from "./pages/admin/upload/upload.component";
import {ActionComponent} from "./pages/user/action/action.component";

import {AuthenticationGuard} from "./services/authentication-guard.service";
import { AdminGuard } from './services/admin-guard.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthenticationGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'upload', component: UploadComponent, canActivate: [AdminGuard]},
  {path: 'action', component: ActionComponent},
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
