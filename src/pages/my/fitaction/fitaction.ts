import {Component} from "@angular/core";
// import * as echarts from 'echarts';
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'FitactionPage',
  segment: 'FitactionPage'
})
@Component({
  selector: 'page-fitnessdetail',
  templateUrl: 'fitaction.html'
})

export class FitactionPage {
  historyArray = [];


  constructor(private loadCtrl: LoadingController,
              private commonService: CommonService) {


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
      r: 'wx_api.user.get_builder',
      starttime:this.getTimeDay()
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.historyArray = [];
        for (let i = 0; i < res.result.action.length; i++) {
          for (let j = 0; j < res.result.action[i].content.length; j++) {
            this.historyArray.push(res.result.action[i].content[j]);
          }
        }
      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    });
  }

  getTimeDay() {
    let D = new Date();
    let curYear = D.getFullYear();
    let curMonth = D.getMonth();
    return new Date(curYear,curMonth).getTime()/1000;
  }

}

