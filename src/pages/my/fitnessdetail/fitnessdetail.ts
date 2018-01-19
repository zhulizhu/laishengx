import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'FitnessDetailPage',
  segment:'FitnessDetailPage'
})
@Component({
  selector: 'page-fitnessdetail',
  templateUrl: 'fitnessdetail.html'
})

export class FitnessDetailPage {

  historyData={
    grade:0,
    time:0,
    total:0,
    action:[],
    comment:[],
  };
  myModaling;

  historyArray=[];
  today;
  endDate;
  type=2;

  constructor(public navCtrl: NavController,
              private loadCtrl:LoadingController,
              private myModal:ModalController,
              private commonService:CommonService) {
    this.today=this.commonService.timeStamp();
  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.history('');
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });
  }

  /**
   * 离开页面
   */

  ionViewDidLeave() {
    if(this.myModaling){
      this.myModaling.dismiss();
    }
  }

  moreAction(){
    this.navCtrl.push('FitactionPage');
  }
  moreRemark(){
    this.navCtrl.push('CoachremarkPage');
  }

  /**
   * 选择时间
   * @constructor
   */
  ChooseTime(){
    this.myModaling=this.myModal.create('ChoosetimePage');
    this.myModaling.onDidDismiss(res=>{
      if(res){
        let time=JSON.parse(res);
        this.today=time.starttime;
        this.endDate=time.endtime;
        this.type=time.type;
        let loading = this.loadCtrl.create({});
        loading.present();
        setTimeout(() => {
          this.history(res);
          setTimeout(() => {
            loading.dismiss();
          }, 500);
        });
      }
    });
    this.myModaling.present();
    // this.navCtrl.push('ChoosetimePage');
  }


  /**
   *历史动作
   */
  history(time) {
    let param;
    if(!time){
      param = {
        r: 'wx_api.user.get_builder',
        starttime:this.getTimeDay()
      };
    }else {
      let oktime=JSON.parse(time);
      param = {
        r: 'wx_api.user.get_builder',
        starttime:oktime.starttime,
        endtime:oktime.endtime
      };
    }

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.historyArray=[];
        this.historyData=res.result;
        this.historyData.grade=Math.round(res.result.grade);
        for(let i=0;i<res.result.action.length;i++){
          for (let j=0;j<res.result.action[i].content.length;j++){
            if(i<2){
              this.historyArray.push(res.result.action[i].content[j]);
            }
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

