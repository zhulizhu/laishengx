
import {NgModule} from "@angular/core";
import {SurePayPage} from "./surePay";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations:[SurePayPage],
  imports:[
    IonicPageModule.forChild(SurePayPage)
  ],
  exports:[SurePayPage]
})

export class HelpModule{

}
