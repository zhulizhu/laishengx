import {NgModule} from "@angular/core";
import {ChoosetimePage} from "./choosetime";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[ChoosetimePage],
  imports:[
    IonicPageModule.forChild(ChoosetimePage)
  ],
  exports:[ChoosetimePage]
})

export class ChoosetimeModule{

}
