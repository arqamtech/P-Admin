import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-sub-cat',
  templateUrl: 'add-sub-cat.html',
})
export class AddSubCatPage {

  cat = this.navParams.get("cat");

  catName: string;
  img1: any;
  img2: any;
  url: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
  ) {
  }


  checkData() {
    if (this.catName) {
      if (this.img2) {
        this.addCat();
      } else { this.presentToast("Select an icon for Sub Category"); }
    } else { this.presentToast("Sub Category Name Empty"); }
  }



  addCat() {

    let loading = this.loadingCtrl.create({
      content: 'Adding Sub Category...'
    });
    loading.present();

    firebase.storage().ref("SubCategories/" + this.catName).put(this.img2).then(() => {
      firebase.storage().ref("SubCategories/" + this.catName).getDownloadURL().then((dURL) => {
        this.url = dURL;
      }).then(() => {
        firebase.database().ref("SubCategories").push({
          Name: this.catName,
          Image: this.url,
          TimeStamp: moment().format(),
        }).then((res) => {
          firebase.database().ref("SubCatsIndex").child(this.cat.key).child(res.key).set(true).then(() => {
            this.presentToast("Sub Category Added");
            loading.dismiss();
            this.close();
          });
        });
      });
    });
  }



  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }


  removeImage() {
    this.img1 = null;
  }

  close() {
    this.viewCtrl.dismiss();
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
