import { Component} from "@angular/core";
import { IonicPage, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

declare var $:any;

@IonicPage({
  name:'RemoneyPage',
  segment:'RemoneyPage'
})

@Component({
  selector: 'page-remoney',
  templateUrl: 'remoney.html'
})

export class RemoneyPage {
  infoArry = ['base', 'kittens'];
  info: string = this.infoArry[0];
  items=[];
  itemx=[];
  itemn=[];
  credit;
  agreement=[];

  constructor(private navCtrl: NavController,
              private loadCtrl:LoadingController,
              private storage:Storage,
              private commonService:CommonService) {

    this.items=[
      {id:0,name:"充值",icon:"assets/img/chongzhi.png"},
      {id:1,name:"提现",icon:"assets/img/tixian.png"},
      {id:2,name:"明细",icon:"assets/img/mingxi.png"},
    ];
    this.itemx=[
      {id:0,name:"续时",icon:"assets/img/xushi.png"},
      {id:1,name:"明细",icon:"assets/img/mingxi.png"},
    ];
    this.itemn=[
      {id:0,name:"购买课时",icon:"assets/img/xushi.png"},
      {id:1,name:"明细",icon:"assets/img/mingxi.png"},
    ];

  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.balanceMoney();
      this.ke();
      this.quan();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }

  swipeEvent(event) {
    //向左滑
    if (event.direction == 2) {
      if (this.infoArry.indexOf(this.info) < 2) {
        this.info = this.infoArry[this.infoArry.indexOf(this.info) + 1];
        this.swipePage(this.info);
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArry.indexOf(this.info) > 0) {
        this.info = this.infoArry[this.infoArry.indexOf(this.info) - 1];
        this.swipePage(this.info);
      }
    }
  }

  getMemberList(){
    this.balanceMoney();
  }

  getCardList() {
    this.quan();
  }
  swipePage(info) {

    if (info == 'base') {
      this.balanceMoney();
    }
    if (info == 'kittens') {
      this.ke();
    }
  }

  itemSelected(id,credit) {
    switch (id) {
      case 0:
        this.storage.set('param',{credit:credit});
        // this.app.getRootNav().setRoot('RechargePage');
        this.navCtrl.push('RechargePage');
        break;
      case 1:
        this.navCtrl.push('CashPage',{credit:credit});
        break;
      case 2:
        this.navCtrl.push('AccountdetailPage');
        break;
    }
  }
  itemXSelected(id){
    switch (id) {
      case 0:
      this.navCtrl.push('BuyclassPage');
      break;
      case 1:
        this.navCtrl.push('ClassdetailPage');
        break;
    }
  }


  problem(){
    this.navCtrl.push('ProblemPage');

  }


  /**
   * 账户余额
   */


  balanceMoney(){
    let param={
      r:'wx_api.user.credit'
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.credit=res.result.credit;
        this.quan();
      }
    })
  }

  ke(){
    let param={
      r:'wx_api.user.getMember'
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.agreement=res.result.agreement;
      }
    })
  }

  quan(){
    let range = $("#svg6"), circle1 = $(".circle1"),circle2 = $(".circle2");
    if (range && circle1&& circle2) {
      //percent1 =  $(".circle1")的百分比/ 100,percent2 = ($(".circle1")的百分比*$(".circle2")的百分比) / 10000
      let percent1 = 70 / 100, perimeter = Math.PI * 2 * 70,percent2 = (40*70) / 10000;
      circle1.attr('stroke-dasharray', perimeter * percent1 + " " + perimeter * (1 - percent1));
      circle2.attr('stroke-dasharray', perimeter * percent2 + " " + perimeter * (1 - percent2));
    }
  }
}
