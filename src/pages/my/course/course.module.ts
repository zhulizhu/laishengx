import {NgModule} from "@angular/core";
import {CoursePage} from "./course";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoursePage],
  imports:[
    IonicPageModule.forChild(CoursePage)
  ],
  exports:[CoursePage]
})

export class CourseModule{

}
