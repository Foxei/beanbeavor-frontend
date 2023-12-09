import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { OverlayModule } from "@angular/cdk/overlay";
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from './material.module';

import { AboutComponent } from "./pages/about/about.component";

import { HomeComponent } from "./pages/home/home.component";

import { AuthenticationComponent } from "./pages/user/authentication/authentication.component";
import { RegisterComponent } from "./pages/user/register/register.component";
import { ForgotPasswordComponent } from "./pages/user/forgot-password/forgot-password.component";
import { ActionComponent } from "./pages/user/action/action.component";
import { UserComponent } from "./pages/user/user/user.component";

import { AdminComponent } from "./pages/admin/admin/admin.component";
import { ChangePriceComponent } from './components/change-price/change-price.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProductCarousellComponent } from './components/product-carousell/product-carousell.component';
import { ProductCardComponent } from './components/product-card/product-card.component';


registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdminComponent,
    AuthenticationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ActionComponent,
    UserComponent,
    ProductCarousellComponent,
    ProductCardComponent,
    UploadComponent,
    ChangePriceComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-DE' // 'de-DE' for Germany, 'fr-FR' for France ...
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
