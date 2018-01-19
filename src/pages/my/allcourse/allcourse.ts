import {Component} from "@angular/core";
import { IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

@IonicPage({
  name: 'AllcoursePage',
  segment: 'AllcoursePage'
})
@Component({
  selector: './page-course',
  templateUrl: 'allcourse.html'
})
export class AllcoursePage {
  infoArray = ['payment', 'use','using', 'comment', 'refund'];
  info = this.infoArray[0];
  type: number;
  startName: any = '开始上课';
  timer;
  endDate: number = 60 * 60;
  second: any;
  day: number;
  hour;
  minute;
  list = [];
  nowTime;

  myCtrlcancelNo;
  myCtrlCancelYes;
  myModalEnd;

  constructor(private navCtrl: NavController,
              private myModal: ModalController,
              private commonService: CommonService,
              private storage:Storage,
              private LoadCtrl: LoadingController) {
    this.nowTime=this.commonService.timeStamp();

    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.courseList(0);
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    }, 300);
  }

  /**
   * 离开该页面
   */
  ionViewDidLeave(){
    if(this.myCtrlcancelNo){
      this.myCtrlcancelNo.dismiss();
    }
    if(this.myCtrlCancelYes){
      this.myCtrlCancelYes.dismiss();
    }
    if(this.myModalEnd){
      this.myModalEnd.dismiss();
    }

  }

  courseListClick(status){
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.courseList(status);
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    }, 300);
  }

  /**
   * 课程列表
   */
  courseList(status) {
    if (status == 0) {
      this.type = 0;
    } else if (status == 1) {
      this.type = 1;
    }else if (status == 2) {
      this.type = 2;
    } else if (status == 3) {
      this.type = 3;
    } else if (status == 6) {
      this.type = 6;
    }
    let param = {
      r: 'wx_api.order.list.get_list',
      page: 1,
      status: status
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.list = res.result.list;
        if(status==2){
          for(let i=0;i<this.list.length;i++){
            if(res.result.list[i].goods.course_starttime>this.nowTime){
              res.result.list[i].statusstr='等待上课';
            }else {
              res.result.list[i].statusstr='使用中';
            }
          }
        }
      } else {

      }
    })
  }

  /**
   * 课程详情（0：团课   1：私教）
   * @param type
   */
  courseDetail(type,orderid,courseType,total,refundstate) {
    let personNum;
    if(courseType==1){
      personNum=total
    }else {
      personNum=0;
    }
    this.navCtrl.push('CoursedetailPage',{orderid:orderid,personNum:personNum,refundstate:refundstate})
  }

  /**
   去支付
   */
  payOrder(id, item) {
    if(item.course_starttime<this.nowTime){
      alert('已经超过了上课时间，不能预约');
      return false;
    }
    let personNum;
    if(item.course_type==1){
      personNum=item.total
    }else {
      personNum=0;
    }
    let items = {
      startTime: item.course_starttime,
      endtime: item.course_endtime,
      course_type:item.course_type,
      marketprice:item.price,
      marketprice1:item.price,
      marketprice2:item.price,
      personNum:personNum,
      storeaddress:item.store.address,
      reminder:item.reminder
    };
    let itemStr=JSON.stringify(items);

    this.storage.set('param', {id: id, itemStr:itemStr});
    // this.app.getRootNav().setRoot('MyOrderClassPage');
    this.navCtrl.push('MyOrderClassPage');
  }
  /**
   * 评价
   */

  comment(orderid,goodsid) {
    this.navCtrl.push('CommentPage',{orderid:orderid,goodsid:goodsid});
  }


  /**
   * 删除订单 (未付款)
   */
  cancelOrderNo(id,type){
    this.myCtrlcancelNo=this.myModal.create('RefundModal',{id:id,type:type});
    this.myCtrlcancelNo.present()
  }
  /**
   * 删除订单 (已付款)
   */
  cancelOrderYes(id,type,price){
    this.myCtrlCancelYes=this.myModal.create('RefundModal',{id:id,type:type,price:price});
    this.myCtrlCancelYes.present()
  }
  /**
   * 开始上课
   */
  start(id,courseStarttime,courseEndtime) {
    let nowTime=Math.round(new Date().getTime()/1000);
    if(courseStarttime>nowTime){
      alert('不好意思，还没有开始上课');
      return false;
    }
    if(courseEndtime<nowTime){
      alert('不好意思，该课已经结束');
      return false;
    }
    let param={
      r:'wx_api.order.op.start',
      id:id
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        let loading = this.LoadCtrl.create({
        });
        loading.present();
        setTimeout(() => {
          this.courseList(1);
          setTimeout(() => {
            loading.dismiss();
          }, 500);
        });
      }else {
        alert(res.result.message)
      }
    })

  }

  /**
   * 1小时倒计时
   * @constructor
   */
  Countdown() {
    if (this.endDate > 0) {
      this.timer = setInterval(() => {
        this.day = Math.floor(this.endDate / (60 * 60 * 24));
        this.hour = Math.floor(this.endDate / (60 * 60)) - (this.day * 24);
        this.minute = Math.floor(this.endDate / 60) - (this.day * 24 * 60) - (this.hour * 60);
        this.second = Math.floor(this.endDate) - (this.day * 24 * 60 * 60) - (this.hour * 60 * 60) - (this.minute * 60);
        this.endDate = this.endDate - 1;
        if (this.hour < 10) {
          this.hour = "0" + this.hour;
        }
        if (this.minute < 10) {
          this.minute = "0" + this.minute;
        }
        if (this.second < 10) {
          this.second = "0" + this.second;
        }
        this.startName = this.hour + ":" + this.minute + ":" + this.second;
        if (this.endDate < 0) {
          clearInterval(this.timer);
          this.startName = '结束课程';
          this.myModalEnd = this.myModal.create('EndModal');
          this.myModalEnd.onDidDismiss(res=>{
            if(res==1){
              this.navCtrl.push('CommentPage');
            }
          });
          this.myModalEnd.present();
        }
      }, 1000);
    }
  }

  swipeEvent(event) {
    //向左滑

    let n = this.infoArray.length - 1;
    if (event.direction == 2) {
      if (this.infoArray.indexOf(this.info) < n) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) + 1];
        this.touch(this.infoArray.indexOf(this.info));
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArray.indexOf(this.info) > 0) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) - 1];
        this.touch(this.infoArray.indexOf(this.info));
      }
    }
  }

  touch(index){
      let loading = this.LoadCtrl.create({
      });
      loading.present();
      setTimeout(() => {
        this.courseList(index);
        setTimeout(() => {
          loading.dismiss();
        }, 500);
      });
  }
}
