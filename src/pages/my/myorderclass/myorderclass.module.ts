import {NgModule} from "@angular/core";
import {MyOrderClassPage} from "./myorderclass";
import {IonicPageModule} from "ionic-angular";
// PayClassPage
@NgModule({
  declarations:[MyOrderClassPage],
  imports:[
    IonicPageModule.forChild(MyOrderClassPage)
  ],
  exports:[MyOrderClassPage]
})

export class MyOrderClassModule{

}
