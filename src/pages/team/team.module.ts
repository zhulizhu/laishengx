import {NgModule} from "@angular/core";
import {TeamPage} from "./team";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[TeamPage],
  imports:[
    IonicPageModule.forChild(TeamPage)
  ],
  exports:[TeamPage]
})

export class TeamModule{

}
