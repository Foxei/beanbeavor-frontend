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

import { AppComponent } from 'src/app/app.component';
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MaterialModule } from 'src/app/material.module';

import { AboutComponent } from "src/app/pages/about/about.component";

import { HomeComponent } from "src/app/pages/home/home.component";

import { AuthenticationComponent } from "src/app/pages/user/authentication/authentication.component";
import { RegisterComponent } from "src/app/pages/user/register/register.component";
import { ForgotPasswordComponent } from "src/app/pages/user/forgot-password/forgot-password.component";
import { ActionComponent } from "src/app/pages/user/action/action.component";
import { UserComponent } from "src/app/pages/user/user/user.component";

import { AdminComponent } from "src/app/pages/admin/admin/admin.component";
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { ProductCarousellComponent } from 'src/app/components/product-carousell/product-carousell.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ChangeProductCatgoryComponent } from 'src/app/components/change-product-category/change-product-category.component';
import { ChangeProductPriceComponent } from 'src/app/components/change-product-price/change-product-price.component';
import { ChangeProductNameComponent } from './components/change-product-name/change-product-name.component';
import { ChangeProductDescriptionComponent } from './components/change-product-description/change-product-description.component';
import { ChangeProductImageComponent } from './components/change-product-image/change-product-image.component';



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
    ChangeProductPriceComponent,
    ChangeProductCatgoryComponent,
    ChangeProductNameComponent,
    ChangeProductImageComponent,
    ChangeProductDescriptionComponent],
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
