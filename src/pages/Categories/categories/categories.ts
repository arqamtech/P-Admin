import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { AddCategoriesPage } from '../add-categories/add-categories';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubCateViewPage } from '../SubCat/sub-cate-view/sub-cate-view';
import { NotiPopPage } from '../../Extra/Notifications/noti-pop/noti-pop';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  cats: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public db: AngularFireDatabase,
  ) {
    this.getCats();
  }


  getCats() {
    this.db.list(`Categories`).snapshotChanges().subscribe(snap => {
      this.cats = [];
      snap.forEach(snip => {
        var temp: any = snip.payload.val();
        temp.key = snip.key;
        this.cats.push(temp);
      })
    })
  }


  gtSubCat(c) {
    this.navCtrl.push(SubCateViewPage, { cat: c });
  }

  gtAddCat() {
    let profileModal = this.modalCtrl.create(AddCategoriesPage);
    profileModal.present();
  }
  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
}
