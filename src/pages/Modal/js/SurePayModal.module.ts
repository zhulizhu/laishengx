import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SurePayModal} from "./SurePayModal";
@NgModule({
  declarations:[SurePayModal],
  imports:[
    IonicPageModule.forChild(SurePayModal)
  ],
  exports:[SurePayModal]
})

export class SurePayModalModule{

}
