import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {TeamOrderclassPage} from "./teamOrderClass";


@NgModule({
  declarations:[TeamOrderclassPage],
  imports:[
    IonicPageModule.forChild(TeamOrderclassPage)
  ],
  exports:[TeamOrderclassPage]
})

export class TeamOrderclassModule{

}
