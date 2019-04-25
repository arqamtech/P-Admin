import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = this.navParams.get("user");


  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  cartRef = this.db.list(`User Data/User Cart/${this.user.key}/Products`);
  cartValueRef = this.db.object(`User Data/User Cart/${this.user.key}/CartValue`);
  cartVal: number = 0;
  items: Array<any> = [];
  orders: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    console.log(this.user)
    this.getCartValue();
    this.getCart();
  }


  getCartValue() {
    this.cartValueRef.snapshotChanges().subscribe(snip => {
      this.cartVal = +snip.payload.val();
    })
  }



  getCart() {
    this.cartRef.snapshotChanges().subscribe(snap => {
      this.items = [];
      snap.forEach(snip => {
        let temp: any;
        this.db.object(`Products/${snip.key}`).snapshotChanges().subscribe(isnap => {
          temp = isnap.payload.val();
          temp.key = isnap.key;
          temp.Quantity = snip.payload.val();
          this.items.push(temp);
        })
      })
    })
  }


  getOrders() {
    this.db.list(`User Data/User Orders/${this.user.key}`).snapshotChanges().subscribe(snap => {
      snap.forEach(snip => {
        this.db.object(`Orders/${snip.key}`).snapshotChanges().subscribe(oSnap => {
          let temp: any;
          let veryTemp: any = oSnap.payload.val();
          this.orders = [];

          this.db.object(`Products/${veryTemp.ProductKey}`).snapshotChanges().subscribe(pSnap => {
            temp = pSnap.payload.val();
            temp.key = pSnap.key;
            temp.Amount = veryTemp.Amount;
            temp.Quantity = veryTemp.Quantity;
            temp.Status = veryTemp.Status;
            temp.TimeStamp = veryTemp.TimeStamp;
            this.orders.push(temp);
            console.log(temp);
          })
        })
      })
    })
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
