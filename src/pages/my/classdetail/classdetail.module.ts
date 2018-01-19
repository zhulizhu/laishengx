import {NgModule} from "@angular/core";
import {ClassdetailPage} from "./classdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[ClassdetailPage],
  imports:[
    IonicPageModule.forChild(ClassdetailPage)
  ],
  exports:[ClassdetailPage]
})

export class ClassdetailModule{

}
