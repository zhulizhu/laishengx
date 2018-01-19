import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

@IonicPage({
  name:'CoursePage',
  segment:'CoursePage'
})
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  startName: any = '开始上课';
  timer;
  endDate:number=5;
  second:any;
  day:number;
  hour;
  minute;
  list=[];
  type;
  total0;
  total1;
  total2;
  total3;
  total6;
  personNum;
  selectYes='';
  selectNo='select-no';
  doing='使用中';
  nowTime;
  myModalEnd;
  myCtrlCancelYes;
  myCtrlCancelNo;

  constructor(private navCtrl: NavController,
              private commonService:CommonService,
              private loadCtrl:LoadingController,
              private storage:Storage,
              private myModal:ModalController) {
    this.type=0;
    this.nowTime=this.commonService.timeStamp();

    this.courseList(1);
    this.courseList(2);
    this.courseList(3);
    this.courseList(6);
  }

  ionViewDidEnter(){
    let loading=this.loadCtrl.create({
    });
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
    if(this.myModalEnd){
      this.myModalEnd.dismiss();
    }
    if(this.myCtrlCancelYes){
      this.myCtrlCancelYes.dismiss();
    }
    if(this.myCtrlCancelNo){
      this.myCtrlCancelNo.dismiss();
    }
  }
  courseListClick(status){

    let loading=this.loadCtrl.create({
    });
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
  courseList(status){
    this.selectYes='';
    if(status==0){
      this.type=0;
    }else if(status==1){
      this.type=1;
    }else if(status==2){
      this.type=2;
    }else if(status==3){
      this.type=3;
    }else if(status==6){
      this.type=6;
    }
    let param={
      r:'wx_api.order.list.get_list',
      page:1,
      status:status
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.list=res.result.list;
        if(status==0){
          this.total0=res.result.total;
        }else if(status==1){
          this.total1=res.result.total;
        }else if(status==2){
          this.total2=res.result.total;
          for(let i=0;i<this.list.length;i++){
            if(res.result.list[i].goods.course_starttime>this.nowTime){
              res.result.list[i].statusstr='等待上课';
            }else {
              res.result.list[i].statusstr='使用中';
            }
          }
        }else if(status==3){
          this.total3=res.result.total;
        }else if(status==6){
          this.total6=res.result.total;
        }
      }else {

      }
    })
  }

  allCourse() {
    this.navCtrl.push('AllcoursePage');
  }

  /**
   * 课程详情（0：团课   1：私教）
   * @param type
   */
  courseDetail(type,orderid,courseType,total,refundstate) {
    if(courseType==1){
      this.personNum=total
    }else {
      this.personNum=0;
    }
    this.navCtrl.push('CoursedetailPage',{status:type,orderid:orderid,personNum:this.personNum,refundstate:refundstate})
  }

  /**
   去支付
   */
  payOrder(id, item) {
    if(item.course_starttime<this.nowTime){
      alert('已经超过了上课时间，不能预约');
      return false;
    }
    if(item.course_type==1){
      this.personNum=item.person
    }else {
      this.personNum=0;
    }
    let items = {
      startTime: item.course_starttime,
      endtime: item.course_endtime,
      course_type:item.course_type,
      marketprice:item.price,
      marketprice1:item.price,
      marketprice2:item.price,
      personNum:this.personNum,
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
    this.myCtrlCancelNo=this.myModal.create('RefundModal',{id:id,type:type});
    this.myCtrlCancelNo.onDidDismiss(res=>{
      if(res==1){
        this.ionViewDidEnter();
      }
    });
    this.myCtrlCancelNo.present()
  }
  /**
   * 删除订单 (已付款)
   */
  cancelOrderYes(id,type,price){
    this.myCtrlCancelYes=this.myModal.create('RefundModal',{id:id,type:type,price:price});
    this.myCtrlCancelYes.onDidDismiss(res=>{
      if(res==1){
        let loading=this.loadCtrl.create({
        });
        loading.present();
        setTimeout(() => {
          this.courseList(1);
          setTimeout(() => {
            loading.dismiss();
          }, 500);
        }, 300);
      }
    });
    this.myCtrlCancelYes.present();
  }

  /**
   * 开始上课
   */
  start(id,courseStarttime,courseEndtime) {
    let nowTime=Math.round(new Date().getTime()/1000);

    if(courseStarttime>nowTime){
      alert('不好意思，还没有开始上课');
      return false;
    };

    if(courseEndtime<nowTime){
      alert('不好意思，该课程已经结束了');
      return false;
    }

    if(courseStarttime<=nowTime&&courseEndtime>=nowTime){
      let param={
        r:'wx_api.order.op.start',
        id:id
      };
      this.commonService.getResult(param).then(res=>{
        if(res.status==1){
          this.ionViewDidEnter();
        }else {
          alert(res.result.message)
        }
      })
    }

  }
  /**
   * 1小时倒计时
   * @constructor
   */
  Countdown(){
    if(this.endDate>0){
      this.timer=setInterval(()=>{
        this.day = Math.floor(this.endDate / (60 * 60 * 24));
        this.hour = Math.floor(this.endDate / (60 * 60)) - (this.day * 24);
        this.minute = Math.floor(this.endDate / 60) - (this.day * 24 * 60) - (this.hour * 60);
        this.second = Math.floor(this.endDate) - (this.day * 24 * 60 * 60) - (this.hour * 60 * 60) - (this.minute * 60);
        this.endDate=this.endDate-1;
        if(this.hour<10){
          this.hour="0"+this.hour;
        }
        if(this.minute<10){
          this.minute="0"+this.minute;
        }
        if(this.second<10){
          this.second="0"+this.second;
        }
        this.startName=this.hour+":"+this.minute+":"+this.second;
        if(this.endDate<0){
          clearInterval(this.timer);
          this.startName='结束课程';
          this.myModalEnd=this.myModal.create('EndModal');
          this.myModalEnd.onDidDismiss(res=>{
            if(res==1){
              this.navCtrl.push('CommentPage');
            }
          });
          this.myModalEnd.present();
        }
      },1000);
    }
  }

}
