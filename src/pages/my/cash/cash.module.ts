import {NgModule} from "@angular/core";
import {CashPage} from "./cash";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [CashPage],
  imports: [
    IonicPageModule.forChild(CashPage)
  ],
  exports: [CashPage]
})

export class CashModule {

}
