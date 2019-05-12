import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotiPopPage } from '../../Extra/Notifications/noti-pop/noti-pop';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  commission: string;
  paymentKey: string;

  name: string;
  email: string;

  isEdit: boolean = false;

  commRef = firebase.database().ref("Admin Data/Comission");
  pKeyRef = firebase.database().ref("Admin Data/PaymentKey");


  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    this.getAdmin();
  }

  getAdmin() {
    firebase.database().ref("Admin Data").child("Admins").child(firebase.auth().currentUser.uid).once('value', itemSnap => {
      this.name = itemSnap.val().Name;
      this.email = itemSnap.val().Email;
    }).then(() => {
      this.commRef.once("value", csnap => {
        this.commission = csnap.val();
      }).then(() => {
        this.pKeyRef.once("value", ksnap => {
          this.paymentKey = ksnap.val();
        })
      })
    })
  }



  editData() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
  }

  confirmUpdate() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Update',
      message: 'Are you sure about the update?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.cancel();
          }
        },
        {
          text: 'Update',
          handler: () => {
            this.update();
          }
        }
      ]
    });
    alert.present();
  }

  update() {
    this.commRef.set(this.commission).then(() => {
      this.pKeyRef.set(this.paymentKey).then(() => {
        this.getAdmin();
        this.isEdit = false;
      })
    })
  }

  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
}
