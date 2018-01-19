import {NgModule} from "@angular/core";
import {RefundModal} from "./RefundModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[RefundModal],
  imports:[
    IonicPageModule.forChild(RefundModal)
  ],
  exports:[RefundModal]
})

export class RefundModalModule{

}
