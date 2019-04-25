import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { SellersViewPage } from '../pages/MainPages/sellers-view/sellers-view';
import { UsersPage } from '../pages/MainPages/users/users';
import { BannersPage } from '../pages/MainPages/banners/banners';
import { ProductsPage } from '../pages/MainPages/products/products';
import { CategoriesPage } from '../pages/Categories/categories/categories';
import { FaqsPage } from '../pages/Extra/Faqs/faqs/faqs';
import { FaqsUserPage } from '../pages/Extra/Faqs/faqs-user/faqs-user';
import { FaqsVendorPage } from '../pages/Extra/Faqs/faqs-vendor/faqs-vendor';
import { SellersDetailsPage } from '../pages/Sellers/sellers-details/sellers-details';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  activePage: any;

  full : boolean = true;

  pages: Array<{ title: string, component: any, icon: any, color : string }>;

  constructor(
    public platform: Platform,    
    public toastCtrl: ToastController,
    ) {
      this.initializeApp();

    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "ios-analytics",color: "whiter" },
      { title: 'Sellers', component: SellersViewPage, icon: "md-ionitron",color: "whiter" },
      { title: 'Categories', component: CategoriesPage, icon: "logo-buffer",color: "whiter" },
      { title: 'Products', component: ProductsPage, icon: "md-cube",color: "whiter" },
      { title: 'Users', component: UsersPage, icon: "ios-people",color: "whiter" },
      { title: 'Banners', component: BannersPage, icon: "md-images",color: "whiter" },
      { title: "Faq's", component: FaqsPage, icon: "md-help",color: "whiter" },
    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        firebase.database().ref("Admin Data").child("Admins").child(user.uid).once('value',itemSnap=>{
            if(itemSnap.exists()){
              var welMsg = "Welcome"+" "+itemSnap.val().Name;
              this.rootPage = SellersDetailsPage;
              this.presentToast(welMsg);
            }else{
              firebase.auth().signOut().then(()=>{
                this.rootPage = LoginPage;
                this.presentToast("You are not registered a Admin")
              })
            }
    });
      }
      else{
        this.rootPage = LoginPage;
      }
    });  
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });

 
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position : "top",
    showCloseButton: false,
  });
  toast.present();
}
collapse(){
  this.full = false;
}
expand(){
  this.full = true;
}

}
