import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, ViewController} from "ionic-angular";

@IonicPage({
  name:'SuccessModal',
  segment:'SuccessModal'
})

@Component({
  selector:'page-modal',
  templateUrl:'../template/SuccessModal.html'
})
export class SuccessModal{

  sureType;

  constructor(private viewCtrl:ViewController,
              private navparams:NavParams,
              private navCtrl:NavController){

    this.sureType=this.navparams.get('sure');
  }


  sure(sureType){
    if(sureType==1){
      // this.app.getRootNav().push('tabsPage');
      this.navCtrl.push('tabsPage');
      this.viewCtrl.dismiss();
    }else {
      // this.app.getRootNav().push('CoursePage',{type:1});
      // this.navCtrl.push('CoursePage',{type:1});
      this.viewCtrl.dismiss(1);
    }

  }

}
