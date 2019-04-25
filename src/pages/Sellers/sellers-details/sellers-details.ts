import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductDetailsPage } from '../../Products/product-details/product-details';


@IonicPage()
@Component({
  selector: 'page-sellers-details',
  templateUrl: 'sellers-details.html',
})
export class SellersDetailsPage {

  seller = this.navParams.get("seller");

  ver: boolean;
  prods: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    switch (this.seller.Status) {
      case "Unverified": this.ver = false;
        break;
      case "Verified": this.ver = true;
        break;
    }
    this.getProducts();
  }



  getProducts() {
    this.db.list(`Seller Data/Products/${this.seller.key}`).snapshotChanges().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
          var temp: any = iiSnap.val();
          temp.key = iiSnap.key;
          tempArray.push(temp);

        })
        this.prods = tempArray;
      })
    })
  }

  displayProd(p) {
    this.navCtrl.push(ProductDetailsPage, { product: p })
  }

  vSeller() {
    let loading = this.loadingCtrl.create({
      content: 'Verifying Seller...'
    });
    loading.present();

    firebase.database().ref("Seller Data/Sellers").child(this.seller.key).child("Status").set("Verified").then(() => {
      this.navCtrl.pop();
      loading.dismiss();
      this.presentToast("Seller Verified");

    }).then(() => {
      firebase.database().ref("Seller Data").child("Notifications").child(this.seller.key).push({
        Type: "Seller Verified",
        Status: "Unread",
        TimeStamp: moment().format(),
      })
    });
  }

  uSeller() {
    let loading = this.loadingCtrl.create({
      content: 'Unverifying Seller...'
    });
    loading.present();

    firebase.database().ref("Seller Data/Sellers").child(this.seller.key).child("Status").set("Unverified").then(() => {
      this.navCtrl.pop();
      loading.dismiss();
      this.presentToast("Seller Unverified");

    }).then(() => {
      firebase.database().ref("Seller Data").child("Notifications").child(this.seller.key).push({
        Type: "Seller UnVerified",
        Status: "Unread",
        TimeStamp: moment().format(),
      })
    });

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
