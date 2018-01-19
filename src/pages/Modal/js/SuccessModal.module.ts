import {NgModule} from "@angular/core";
import {SuccessModal} from "./SuccessModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[SuccessModal],
  imports:[
    IonicPageModule.forChild(SuccessModal)
  ],
  exports:[SuccessModal]
})

export class SuccessModalModule{

}
