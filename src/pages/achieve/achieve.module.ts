import {NgModule} from "@angular/core";
import {AchievePage} from "./achieve";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[AchievePage],
  imports:[
    IonicPageModule.forChild(AchievePage)
  ],
  exports:[AchievePage]
})

export class AchieveModule{

}
