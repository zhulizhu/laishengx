import {NgModule} from "@angular/core";
import {CoachPage} from "./coach";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoachPage],
  imports:[
    IonicPageModule.forChild(CoachPage)
  ],
  exports:[CoachPage]
})

export class CoachModule{

}
