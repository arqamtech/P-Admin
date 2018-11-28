import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserDetailsPage } from '../pages/Users/user-details/user-details';
import { UserOptionsPage } from '../pages/Users/user-options/user-options';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { SellersDetailsPage } from '../pages/Sellers/sellers-details/sellers-details';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { LoginPage } from '../pages/Auth/login/login';
import { UsersPage } from '../pages/MainPages/users/users';
import { SellersViewPage } from '../pages/MainPages/sellers-view/sellers-view';
import { AddBannersPage } from '../pages/Banners/add-banners/add-banners';
import { BannersPage } from '../pages/MainPages/banners/banners';
import { ProductDetailsPage } from '../pages/Products/product-details/product-details';
import { ProductsPage } from '../pages/MainPages/products/products';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ViewBarCodePage } from '../pages/Products/view-bar-code/view-bar-code';



export const firebaseCred = {
  apiKey: "AIzaSyDfYGCZchTJHmNBlk4-T4-B24d7qtBs4LQ",
  authDomain: "posters-83a2e.firebaseapp.com",
  databaseURL: "https://posters-83a2e.firebaseio.com",
  projectId: "posters-83a2e",
  storageBucket: "posters-83a2e.appspot.com",
  messagingSenderId: "9709869347"
};
firebase.initializeApp(firebaseCred);




@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    UsersPage,
    UserDetailsPage,
    UserOptionsPage,
    SellersViewPage,
    SellersDetailsPage,
    BannersPage,
    AddBannersPage,
    ProductDetailsPage,
    ProductsPage,
    ViewBarCodePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    UsersPage,
    UserDetailsPage,
    UserOptionsPage,
    SellersViewPage,
    SellersDetailsPage,
    BannersPage,
    AddBannersPage,
    ProductsPage,
    ProductDetailsPage,
    ViewBarCodePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
