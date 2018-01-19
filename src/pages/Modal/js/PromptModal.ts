import {Component} from "@angular/core";
import {IonicPage, ViewController} from "ionic-angular";
@Component({
  selector:'page-modal',
  templateUrl:'../template/PromptModal.html'
})

@IonicPage({
  name:'PromptModal',
  segment:'PromptModal'
})
export class PromptModal{
  constructor(private viewCtrl:ViewController){

  }

  go(){
    // this.appCtrl.getRootNav().push('BuyclassPage');
    // this.navCtrl.push('BuyclassPage');
    this.viewCtrl.dismiss(1)
  }


  cancel(){
    this.viewCtrl.dismiss(0)
  }
}
