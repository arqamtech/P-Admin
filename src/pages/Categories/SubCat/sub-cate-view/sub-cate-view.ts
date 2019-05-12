import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AddSubCatPage } from '../add-sub-cat/add-sub-cat';
import { SubCatItemViewPage } from '../../SubCatItem/sub-cat-item-view/sub-cat-item-view';



@IonicPage()
@Component({
  selector: 'page-sub-cate-view',
  templateUrl: 'sub-cate-view.html',
})
export class SubCateViewPage {

  c = this.navParams.get("cat");

  cats: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
  ) {
    this.getCats();
  }


  getCats() {
    this.db.list(`SubCatsIndex/${this.c.key}`).snapshotChanges().subscribe(snap => {
      this.cats = [];
      snap.forEach(snip => {
        firebase.database().ref("SubCategories").child(snip.key).once("value", ssnip => {
          var temp: any = ssnip.val();
          temp.key = ssnip.key;
          console.log(temp)
          this.cats.push(temp);
        })
      })
    })
  }


  gtSubCat(c) {
    this.navCtrl.push(SubCatItemViewPage, { cat: c });
  }

  gtAddCat() {
    let profileModal = this.modalCtrl.create(AddSubCatPage, { cat: this.c });
    profileModal.present();
  }
}
