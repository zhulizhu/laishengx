import {NgModule} from "@angular/core";
import {CoachorderclassPage} from "./coachOrderClass";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoachorderclassPage],
  imports:[
    IonicPageModule.forChild(CoachorderclassPage)
  ],
  exports:[CoachorderclassPage]
})

export class CoachorderclassModule{

}
