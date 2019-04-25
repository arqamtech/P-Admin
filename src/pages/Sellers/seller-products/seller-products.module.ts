import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerProductsPage } from './seller-products';

@NgModule({
  declarations: [
    SellerProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerProductsPage),
  ],
})
export class SellerProductsPageModule {}
