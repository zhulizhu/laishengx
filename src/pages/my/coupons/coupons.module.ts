import {NgModule} from "@angular/core";
import {CouponsPage} from "./coupons";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CouponsPage],
  imports:[
    IonicPageModule.forChild(CouponsPage)
  ],
  exports:[CouponsPage]
})

export class CouponsModule{

}
