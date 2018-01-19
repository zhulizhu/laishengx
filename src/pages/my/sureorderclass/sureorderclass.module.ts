import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SureOrderClassPage} from "./sureorderclass";
@NgModule({
  declarations:[SureOrderClassPage],
  imports:[
    IonicPageModule.forChild(SureOrderClassPage)
  ],
  exports:[SureOrderClassPage]
})

export class SureOrderClassModule{

}
