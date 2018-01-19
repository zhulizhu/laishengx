import {NgModule} from "@angular/core";
import {CommentPage} from "./comment";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CommentPage],
  imports:[
    IonicPageModule.forChild(CommentPage)
  ],
  exports:[CommentPage]
})

export class CommentModule{

}
