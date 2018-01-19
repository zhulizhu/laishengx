import {NgModule} from "@angular/core";
import {CardPage} from "./card";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CardPage],
  imports:[
    IonicPageModule.forChild(CardPage)
  ],
  exports:[CardPage]
})

export class CardModule{

}
