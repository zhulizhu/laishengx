import {NgModule} from "@angular/core";
import {ProjectModal} from "./ProjectModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[ProjectModal],
  imports:[
    IonicPageModule.forChild(ProjectModal)
  ],
  exports:[ProjectModal]
})

export class ProjectModalModule{

}
