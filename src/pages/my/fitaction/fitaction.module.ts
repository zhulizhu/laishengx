import {NgModule} from "@angular/core";
import {FitactionPage} from "./fitaction";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[FitactionPage],
  imports:[
    IonicPageModule.forChild(FitactionPage)
  ],
  exports:[FitactionPage]
})

export class FitactionModule{

}
