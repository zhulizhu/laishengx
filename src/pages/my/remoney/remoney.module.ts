import {NgModule} from "@angular/core";
import {RemoneyPage} from "./remoney";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[RemoneyPage],
  imports:[
    IonicPageModule.forChild(RemoneyPage)
  ],
  exports:[RemoneyPage]
})

export class HelpModule{

}
