import {NgModule} from "@angular/core";
import {AllcoursePage} from "./allcourse";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[AllcoursePage],
  imports:[
    IonicPageModule.forChild(AllcoursePage)
  ],
  exports:[AllcoursePage]
})

export class AllcourseModule{

}
