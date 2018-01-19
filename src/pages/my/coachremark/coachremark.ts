import {Component} from "@angular/core";
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'CoachremarkPage',
  segment:'CoachremarkPage'
})
@Component({
  selector: 'page-fitnessdetail',
  templateUrl: 'coachremark.html'
})

export class CoachremarkPage {

  historyArray=[];
  constructor(
              private loadCtrl:LoadingController,
              private commonService:CommonService) {

  }


  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.history();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });
  }


  /**
   *历史动作
   */
  history() {
    let param = {
      r: 'wx_api.user.get_builder'
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.historyArray=res.result.comment;

      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    });
  }

}

