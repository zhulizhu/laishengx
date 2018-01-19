import {NgModule} from "@angular/core";
import {BuyWayModal} from "./BuyWayModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[BuyWayModal],
  imports:[
    IonicPageModule.forChild(BuyWayModal)
  ],
  exports:[BuyWayModal]
})

export class BuyWayModalModule{

}
