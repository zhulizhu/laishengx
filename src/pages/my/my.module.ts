import {NgModule} from "@angular/core";
import {MyPage} from "./my";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[MyPage],
  imports:[
    IonicPageModule.forChild(MyPage)
  ],
  exports:[MyPage]
})

export class MyModule{

}
