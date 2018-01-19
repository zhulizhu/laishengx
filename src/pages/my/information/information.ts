import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'InformationPage',
  segment: 'InformationPage'
})
@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})

export class InformationPage {

  inform = {
    sex: 0,
    year: 0,
    height: 0,
    weight: 0,
    skeletal_muscle:0,
    fat: 0,
    water: 0,
    leanWeight: 0,
    massIndex: 0,
    weightPercent: 0,
    waist: 0,
    basic: 0,
    muscle: 0,
    fatControl: 0,
  };
  myModaling;
  historyData={
    grade:0,
    time:0,
    total:0,
  };
  loading;
  constructor(public myModal: ModalController,
              private commonService: CommonService,
              private loadCtrl: LoadingController,
              public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.loading = this.loadCtrl.create({});
    this.loading.present();
    setTimeout(() => {
      this.basicInfor();
      this.history();

    });
  }

  /**
   * 离开该页面
   */
  ionViewDidLeave() {
    if (this.myModaling) {
      this.myModaling.dismiss();
    }
  }

  sure(inform, type) {
    this.myModaling = this.myModal.create('InforModal', {inform: inform, type: type});
    this.myModaling.onDidDismiss(res => {
      if (res == 1) {
        this.ionViewDidEnter();
      }
    });
    this.myModaling.present();

  }

  basicInfor() {
    let param = {
      r: 'wx_api.user.get_userinfo'
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500);
        let a = this.commonService.isEmptyObject(res.result.data);
        if (res.result.data && a) {
          this.inform = res.result.data;
        } else {
          this.inform = {
            sex: 0,
            year: 0,
            height: 0,
            weight: 0,
            skeletal_muscle:0,
            fat: 0,
            water: 0,
            leanWeight: 0,
            massIndex: 0,
            weightPercent: 0,
            waist: 0,
            basic: 0,
            muscle: 0,
            fatControl: 0,
          };
        }
      } else {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500);
        alert(res.result.message)
      }
    })
  }

  fitDetail() {
    this.navCtrl.push('FitnessDetailPage')
  }

  /**
   *历史动作
   */
  history() {
    let param = {
      r: 'wx_api.user.get_builder',
      starttime:this.getTimeDay(8,0,0),
      endtime: this.getTimeDay(23,59,59)
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.historyData=res.result;
        this.historyData.grade=Math.round(res.result.grade);
      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    });
  }

  getTimeDay(hour,min,sec) {
    let D = new Date();
    let curYear = D.getFullYear();
    let curMonth = D.getMonth();
    let curDay = D.getDate();
    return new Date(curYear,curMonth,curDay,hour,min,sec).getTime()/1000;
  }
}
