import {NgModule} from "@angular/core";
import {PromptModal} from "./PromptModal";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations:[PromptModal],
  imports:[
    IonicPageModule.forChild(PromptModal)
  ],
  exports:[PromptModal]
})

export class PromptModalModule{

}
