import {NgModule} from "@angular/core";
import {CoursedetailPage} from "./coursedetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CoursedetailPage],
  imports:[
    IonicPageModule.forChild(CoursedetailPage)
  ],
  exports:[CoursedetailPage]
})

export class CoursedetailModule{

}
