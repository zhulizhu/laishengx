import {NgModule} from "@angular/core";
import {CoachremarkPage} from "./coachremark";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoachremarkPage],
  imports:[
    IonicPageModule.forChild(CoachremarkPage)
  ],
  exports:[CoachremarkPage]
})

export class CoachremarkModule{

}
