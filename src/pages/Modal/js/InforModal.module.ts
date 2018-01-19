import {NgModule} from "@angular/core";
import {InforModal} from "./InforModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[InforModal],
  imports:[
    IonicPageModule.forChild(InforModal)
  ],
  exports:[InforModal]
})

export class InforModalModule{

}
