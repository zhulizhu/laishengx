import {NgModule} from "@angular/core";
import {EndModal} from "./EndModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[EndModal],
  imports:[
    IonicPageModule.forChild(EndModal)
  ],
  exports:[EndModal]
})

export class EndModalModule{

}
