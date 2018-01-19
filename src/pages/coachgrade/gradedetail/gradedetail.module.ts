import {NgModule} from "@angular/core";
import {GradeDetailPage} from "./gradedetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[GradeDetailPage],
  imports:[
    IonicPageModule.forChild(GradeDetailPage)
  ],
  exports:[GradeDetailPage]
})

export class GradeDetailModule{

}
