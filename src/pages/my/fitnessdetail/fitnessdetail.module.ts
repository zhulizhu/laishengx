import {NgModule} from "@angular/core";
import {FitnessDetailPage} from "./fitnessdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[FitnessDetailPage],
  imports:[
    IonicPageModule.forChild(FitnessDetailPage)
  ],
  exports:[FitnessDetailPage]
})

export class FitnessDetailModule{

}
