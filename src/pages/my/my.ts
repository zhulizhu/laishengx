import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";
declare var $: any;
@IonicPage({
  name: 'MyPage',
  segment: 'MyPage'
})

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})

export class MyPage {
  items = [];
  infoArray = ['all', 'payment', 'use'];
  info = this.infoArray[0];
  user = {
    times: '',
    stage_times: '',
    stage: [{focus: '', stage_times: ''}],
    stay: '',
    course_time: 0,
    second_stage_times: '',
    third_stage_times: '',
  };

  constructor(public navCtrl: NavController,
              private loadCtrl: LoadingController,
              private commonService: CommonService) {


    this.items = [
      {id: 1, name: "我的课程", icon: "assets/img/kecheng.png"},
      {id: 2, name: "我的资料", icon: "assets/img/ziliao.png"},
      {id: 3, name: "我的会员卡", icon: "assets/img/yue.png"},
      // {id: 7, name: "我的会员卡", icon: "assets/img/huiyuan.png"},
      {id: 4, name: "用户成就", icon: "assets/img/huiyuan.png"},
      {id: 5, name: "我的卡券", icon: "assets/img/youhuiquan.png"},
      {id: 6, name: "套餐购买", icon: "assets/img/goumai.png"},
    ];

  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.myDetail();
      this.percentQuan(0);
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }


  itemSelected(id) {
    switch (id) {
      case 1:
        this.navCtrl.push('CoursePage');
        break;
      case 2:
        this.navCtrl.push('InformationPage');
        break;
      case 3:
        this.navCtrl.push('RemoneyPage');
        break;
      case 4:
        // this.navCtrl.push('CardPage');
        this.navCtrl.push('AchievePage');
        break;
      case 5:
        this.navCtrl.push('CouponsPage', {couponsList: 0});
        break;
      case 6:
        this.navCtrl.push('BuyclassPage');
        break;
      // case 7:
      //   this.navCtrl.push('CardPage');
      //   break;
    }
  }

  /**
   * 我的
   */

  myDetail() {
    let param = {
      r: 'wx_api.user'
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.user = res.result;
        // this.user.course_time=Math.floor(Number(res.result.course_time)/60);
        let shi;
        shi=parseFloat(res.result.times)/parseFloat(res.result.stage[0].stage_times)*100;
        if(shi>=100){
          shi=100;
        }

        this.percentQuan(shi);
      }
    })
  }

  percentA(n,c) {
    let shi=(n/c)*100;
    if(shi>=100){
      shi=100;
    }
    this.percentQuan(shi);
  }

  percentQuan(shi) {
    let range = $("#svg6"), circle1 = $(".circle1"), circle2 = $(".circle2");
    if (range && circle1 && circle2) {
      //percent1 =  $(".circle1")的百分比/ 100,percent2 = ($(".circle1")的百分比*$(".circle2")的百分比) / 10000
      let percent1 = 70 / 100, perimeter = Math.PI * 2 * 70, percent2 = (shi * 70) / 10000;
      circle1.attr('stroke-dasharray', perimeter * percent1 + " " + perimeter * (1 - percent1));
      circle2.attr('stroke-dasharray', perimeter * percent2 + " " + perimeter * (1 - percent2));
    }
  }

  order() {
    this.navCtrl.setRoot('CoachPage');

  }


  swipeEvent(event) {
    //向左滑
    let n = this.infoArray.length - 1;
    if (event.direction == 2) {
      if (this.infoArray.indexOf(this.info) < n) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) + 1];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArray.indexOf(this.info) > 0) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) - 1];
      }
    }
  }

}
