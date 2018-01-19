import { Component} from "@angular/core";
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'ClassdetailPage',
  segment:'ClassdetailPage'
})
@Component({
  selector: 'page-classdetail',
  templateUrl: 'classdetail.html'
})

export class ClassdetailPage {


  myDate=new Date().toISOString();
  time=new Date().toISOString();
  today=this.getToday(this.myDate);
  maxDate=new Date().toISOString();

  page:number;
  cost=[];
  list=[];
  recharge=[];
  lists=[];
  cost_total;
  totalZong;

  constructor(private commonService:CommonService,private loadCtrl:LoadingController){

  }
  ionViewDidEnter(){
    let loading = this.loadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.accountDetail(this.today);
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }

  changeTime(myDate){
    this.today=this.getToday(myDate);
    this.accountDetail(this.today);
  }
  /**
   * 明细列表
   */
  accountDetail(time){
    // if(!page||page==1){
    //   page=1;
    //   this.lists=[];
    // }
    let paramtype0={
      r:'wx_api.user.agreement_log',
      time:time,
    };
    this.commonService.getResult(paramtype0).then(res=> {
      if (res.status == 1) {
        this.cost_total=res.result.cost_total;
        this.cost=res.result.cost;
        this.totalZong=Number(res.result.cost_total)+Number(res.result.rest_value);
        this.recharge=res.result.recharge;
      } else {
      }
    })
  }
  /**
   * 向下刷新
   */
  // doInfinite(Infinite) {
  //   setTimeout(() => {
  //     this.page += 1;
  //     this.accountDetail(this.page,this.today);
  //     Infinite.complete();
  //   }, 2000);
  // }

  /**
   *
   */
  getToday(time) {
    let date = time;
    let year = date.slice(0,4);
    let month = date.slice(5,7)-1;
    return new Date(year,month).getTime()/1000;
  }
}
