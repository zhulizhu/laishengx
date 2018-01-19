import {NgModule} from "@angular/core";
import {AccountdetailPage} from "./accountdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[AccountdetailPage],
  imports:[
    IonicPageModule.forChild(AccountdetailPage)
  ],
  exports:[AccountdetailPage]
})

export class AccountdetailModule{

}
