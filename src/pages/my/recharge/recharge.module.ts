import {NgModule} from "@angular/core";
import {RechargePage} from "./recharge";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[RechargePage],
  imports:[
    IonicPageModule.forChild(RechargePage)
  ],
  exports:[RechargePage]
})

export class RechargeModule{

}
