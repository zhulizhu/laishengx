import {NgModule} from "@angular/core";
import {TeamdetailPage} from "./teamdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[TeamdetailPage],
  imports:[
    IonicPageModule.forChild(TeamdetailPage)
  ],
  exports:[TeamdetailPage]
})

export class TeamdetailModule{

}
