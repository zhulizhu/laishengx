import {NgModule} from "@angular/core";
import {HelpPage} from "./help";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[HelpPage],
  imports:[
    IonicPageModule.forChild(HelpPage)
  ],
  exports:[HelpPage]
})

export class HelpModule{

}
