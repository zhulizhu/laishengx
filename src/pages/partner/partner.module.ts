import {NgModule} from "@angular/core";
import {PartnerPage} from "./partner";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[PartnerPage],
  imports:[
    IonicPageModule.forChild(PartnerPage)
  ],
  exports:[PartnerPage]
})

export class PartnerModule{

}
