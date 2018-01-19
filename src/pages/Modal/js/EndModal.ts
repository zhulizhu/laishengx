import {Component} from "@angular/core";
import {IonicPage,ViewController} from "ionic-angular";


@IonicPage({
  name:'EndModal',
  segment:'EndModal'
})

@Component({
  selector:'page-modal',
  templateUrl:'../template/EndModal.html'
})
export class EndModal{
  constructor(private viewCtrl:ViewController){

  }
  cancel(){
    this.viewCtrl.dismiss()
  }

  comment(){
    // this.appCtrl.getRootNav().push('CommentPage');
    // this.navCtrl.push('CommentPage');
    this.viewCtrl.dismiss(1)
  }
}
