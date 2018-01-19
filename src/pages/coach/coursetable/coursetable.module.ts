import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CourseTablePage} from "./coursetable";
@NgModule({
  declarations:[CourseTablePage],
  imports:[
    IonicPageModule.forChild(CourseTablePage)
  ],
  exports:[CourseTablePage]
})

export class CourseTableModule{

}
