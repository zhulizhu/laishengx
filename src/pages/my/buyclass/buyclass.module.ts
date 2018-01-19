import {NgModule} from "@angular/core";
import {BuyclassPage} from "./buyclass";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[BuyclassPage],
  imports:[
    IonicPageModule.forChild(BuyclassPage)
  ],
  exports:[BuyclassPage]
})

export class BuyclassModule{

}
