import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerSalesPage } from './seller-sales';

@NgModule({
  declarations: [
    SellerSalesPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerSalesPage),
  ],
})
export class SellerSalesPageModule {}
