import {NgModule} from "@angular/core";
import {ProtocolPage} from "./protocol";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[ProtocolPage],
  imports:[
    IonicPageModule.forChild(ProtocolPage)
  ],
  exports:[ProtocolPage]
})

export class ProtocolModule{

}
