import {NgModule} from "@angular/core";
import {InformationPage} from "./information";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[InformationPage],
  imports:[
    IonicPageModule.forChild(InformationPage)
  ],
  exports:[InformationPage]
})

export class InformationModule{

}
