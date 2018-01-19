import {NgModule} from "@angular/core";
import {HelpdetailPage} from "./helpdetail";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations:[HelpdetailPage],
  imports:[
    IonicPageModule.forChild(HelpdetailPage)
  ],
  exports:[HelpdetailPage]
})

export class HelpdetailModule{

}
