import {NgModule} from "@angular/core";
import {BuycardPage} from "./buycard";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[BuycardPage],
  imports:[
    IonicPageModule.forChild(BuycardPage)
  ],
  exports:[BuycardPage]
})

export class BuycardModule{

}
