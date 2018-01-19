import {NgModule} from "@angular/core";
import {CoachdetailPage} from "./coachdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoachdetailPage],
  imports:[
    IonicPageModule.forChild(CoachdetailPage)
  ],
  exports:[CoachdetailPage]
})

export class CoachdetailModule{

}
