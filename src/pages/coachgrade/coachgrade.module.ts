import {NgModule} from "@angular/core";
import {CoachGradePage} from "./coachgrade";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoachGradePage],
  imports:[
    IonicPageModule.forChild(CoachGradePage)
  ],
  exports:[CoachGradePage]
})

export class CoachGradeModule{

}
