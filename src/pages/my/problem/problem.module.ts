import {NgModule} from "@angular/core";
import {ProblemPage} from "./problem";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations:[ProblemPage],
  imports:[
    IonicPageModule.forChild(ProblemPage)
  ],
  exports:[ProblemPage]
})

export class ProblemModule{

}
