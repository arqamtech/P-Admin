import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-categories',
  templateUrl: 'add-categories.html',
})
export class AddCategoriesPage {

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
      } else { this.presentToast("Select an icon for Categoy"); }
    } else { this.presentToast("Category Name Empty"); }
  }

  addCat() {

    let loading = this.loadingCtrl.create({
      content: 'Adding Category...'
    });
    loading.present();

    firebase.storage().ref("Categories/" + this.catName).put(this.img2).then(() => {
      firebase.storage().ref("Categories/" + this.catName).getDownloadURL().then((dURL) => {
        this.url = dURL;
      }).then(() => {
        firebase.database().ref("Categories").push({
          Name: this.catName,
          Image: this.url,
          TimeStamp: moment().format(),
        }).then(() => {
          this.presentToast("Category Added");
          loading.dismiss();
          this.close();
        });


      })
    })

  }



  // UploadPic() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();

  //   firebase.storage().ref("Banners/" + this.order).put(this.img2).then(() => {
  //     firebase.storage().ref("Banners/" + this.order).getDownloadURL().then((dURL) => {
  //       this.url = dURL;
  //     }).then(() => {

  //       firebase.database().ref("Promotionals/Banners").push({
  //         Name: this.order,
  //         Image: this.url,
  //         PostTime: moment().format()
  //       }).then(() => {
  //         this.navCtrl.setRoot(BannersPage);
  //       }).then(() => {
  //         this.presentToast();
  //         loading.dismiss();
  //       })
  //     })
  //   })
  // }








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
