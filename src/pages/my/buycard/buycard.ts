import { Component} from "@angular/core";
import {IonicPage,ModalController} from "ionic-angular";
@IonicPage({
  name:'BuycardPage',
  segment:'BuycardPage'
})
@Component({
  selector: 'page-buycard',
  templateUrl: 'buycard.html'
})

export class BuycardPage {

  myModalSuccess;

  constructor(
    private myModal:ModalController,
  ){

  }

  /**
   * 离开该页面
   */
  ionViewDidLeave(){
    if(this.myModalSuccess){
      this.myModalSuccess.dismiss();
    }

  }
  sure(){
    this.myModalSuccess=this.myModal.create('SuccessModal',{sure:2});
    this.myModalSuccess.present();
  }
}
