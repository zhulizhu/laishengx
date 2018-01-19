import {NgModule} from "@angular/core";
import {ContractModal} from "./ContractModal";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [ContractModal],
  imports: [
    IonicPageModule.forChild(ContractModal)
  ],
  exports: [ContractModal]
})

export class ContractModule {

}
