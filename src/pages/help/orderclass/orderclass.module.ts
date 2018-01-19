import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HelpOrderclassPage} from "./orderclass";
@NgModule({
  declarations:[HelpOrderclassPage],
  imports:[
    IonicPageModule.forChild(HelpOrderclassPage)
  ],
  exports:[HelpOrderclassPage]
})

export class HelpOrderclassModule{

}
