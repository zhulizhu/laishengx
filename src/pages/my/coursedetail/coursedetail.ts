import {Component} from "@angular/core";
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController,
  NavParams
} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

@IonicPage({
  name: 'CoursedetailPage',
  segment: 'CoursedetailPage/:orderid/:personNum/:refundstate'
})
@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html'
})
export class CoursedetailPage {
  startName: any = '开始上课';
  timer;
  endDate: number = 2;
  second: any;
  day: number;
  hour;
  minute;
  btnYes = 'btn-active';
  btnNo = 'btn-a';

  itemOrder = {
    couponprice: '',
    status: '',
    paytype:'',
    id:'',
    price:''
  };
  itemOrderGoods = {
    course_type: '',
    total: '',
    id:''
  };
  course_type;
  openType=0;//开门方式
  openUrl=0;//开门方式

  nowTime=this.commonService.timeStamp();
  doing='使用中';
  orderid;
  refundstate=0;
  myCtrlCancel;
  myModalEnd;
  week='';
  chanYes=0; //0:结束时间<现在时间 1:结束时间>现在时间

  constructor(private navParams: NavParams,
              private myModal: ModalController,
              private loadCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl:AlertController,
              private storage:Storage,
              private commonService: CommonService) {

    this.orderid = this.navParams.get('orderid');
    this.refundstate = this.navParams.get('refundstate');

  }

  ionViewDidEnter(){
    let loading = this.loadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.orderDetail(this.orderid);
      loading.dismiss();
    }, 300);

  }

  /**
   * 离开该页面
   */
  ionViewDidLeave(){
    if(this.myCtrlCancel){
      this.myCtrlCancel.dismiss();
    }
    if(this.myModalEnd){
      this.myModalEnd.dismiss();
    }
  }


  /**
   * 订单详情
   */
  orderDetail(orderid) {
    let param = {
      r: 'wx_api.order.detail',
      orderid: orderid,
      wxref: 'mp.weixin.qq.com'
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.itemOrder = res.result.order;
        this.itemOrderGoods = res.result.order_goods;
        this.week=this.commonService.getWeekNum(res.result.order_goods.course_starttime);
        if(Number(this.nowTime)>Number(res.result.order_goods.course_endtime)){
          this.chanYes=0;
        }else {
          this.chanYes=1;
        }
        this.course_type = res.result.order_goods.course_type;
        if(res.result.order.status==2){
          let startTime=res.result.order_goods.course_starttime;
          let endTime=res.result.order_goods.course_endtime;
          this.Countdown(startTime,endTime);
        }
      } else {

      }
    })
  }

  /**
   去支付
   */
  payOrder(id, item) {
    if(item.course_starttime<this.nowTime){
      alert('已经超过了上课时间，不能预约');
      return false;
    }
    let items = {
      startTime: item.course_starttime,
      endtime: item.course_endtime,
      course_type:item.course_type,
      marketprice:item.marketprice,
      marketprice1:item.marketprice1,
      marketprice2:item.marketprice2,
      personNum:this.navParams.get('personNum'),
      storeaddress:item.storeaddress
    };
    let itemStr=JSON.stringify(items);
    this.storage.set('param',{id: id, itemStr:itemStr});
    // this.app.getRootNav().setRoot('MyOrderClassPage')
    this.navCtrl.push('MyOrderClassPage')
  }
  /**
   * 删除订单 (已付款)
   */
  cancelOrder(id,type,price){
    this.myCtrlCancel=this.myModal.create('RefundModal',{id:id,type:type,price:price});
    this.myCtrlCancel.onDidDismiss(res=>{
      if(res==1){
        this.ionViewDidEnter()
      }
    });
    this.myCtrlCancel.present()
  }
  /**
   * 开门方式
   */
  openDoor(id,type,courseStarttime,courseEndtime){
    if(Number(courseStarttime-15*60)>Number(this.nowTime)&&Number(courseEndtime)>Number(this.nowTime)){
      alert('不好意思，只能提前15分钟进入训练区');
      return false;
    }else if(Number(courseEndtime)<Number(this.nowTime)&&Number(courseEndtime+15*60)<Number(this.nowTime)){
      alert('不好意思，该课结束15分钟后不能进入训练区');
      return false;
    }else {
      let param={
        r:'wx_api.lock.open',
        orderid:id,
        type:type
      };

      if(type==1){

        let alerting=this.alertCtrl.create({
          title:'<h2>二维码开门</h2>',
          message:'温馨提示：只能使用两次<br/>确定使用<span>二维码开门</span>吗？',
          buttons:[
            {
              text:'取消',
              role:'cancel',
              handler:()=>{
                alerting.dismiss();
                this.btnYes = 'btn-a';
                this.btnNo = 'btn-active';
              }
            },{
              text:'确定',
              handler:data=>{
                this.commonService.getResult(param).then(res=>{
                  if (res.status == 1) {
                    this.openType=1;
                    this.openUrl = res.result.message;
                  } else {
                    alert(res.result.message)
                  }
                })
              }
            }
          ]
        });
        alerting.present();
      }else {
        this.openType=0;
        let alerting=this.alertCtrl.create({
          title:'<h2>遥控开门</h2>',
          message:'温馨提示：只能使用两次<br/>确定使用<span>遥控开门</span>吗？',
          buttons:[
            {
              text:'取消',
              role:'cancel',
              handler:()=>{
                alerting.dismiss();
                this.btnYes = 'btn-active';
                this.btnNo = 'btn-a';
              }
            },
            {
              text:'确定',
              handler:data=>{
                this.commonService.getResult(param).then(res=>{
                  if(res.status==1){
                    this.btnYes = 'btn-a';
                    this.btnNo = 'btn-active';
                  }else {
                    alert(res.result.message)
                  }
                })
              }
            }
          ],
          enableBackdropDismiss:true,
          cssClass:'openCss'
        });
        alerting.present();
      }
    }

  }

  /**
   * 开始上课
   */

  start(id,courseStarttime,courseEndtime) {
    if(courseStarttime>this.nowTime){
      alert('不好意思，还没有开始上课');
      return false;
    };
    if(courseEndtime<this.nowTime){
      alert('不好意思，该课程已经结束了');
      return false;
    }

    if(courseStarttime<=this.nowTime&&courseEndtime>=this.nowTime){
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
      });
    }

  }

  /**
   * 评价
   */
  comment(orderid,goodsid) {
    this.navCtrl.push('CommentPage',{orderid:orderid,goodsid:goodsid});
  }

  /**
   * 1小时倒计时
   * @constructor
   */
  Countdown(startTime, endTime) {
    if (startTime > this.nowTime) {
      this.doing = '等待上课'
    } else {
      let n=0;
      let jian = endTime - this.nowTime;
      if (jian > 0) {
        this.timer = setInterval(() => {
          this.day = Math.floor(jian / (60 * 60 * 24));
          this.hour = Math.floor(jian / (60 * 60)) - (this.day * 24);
          this.minute = Math.floor(jian / 60) - (this.day * 24 * 60) - (this.hour * 60);
          this.second = Math.floor(jian) - (this.day * 24 * 60 * 60) - (this.hour * 60 * 60) - (this.minute * 60);
          jian = jian - 1;
          if (this.hour < 10) {
            this.hour = "0" + this.hour;
          }
          if (this.minute < 10) {
            this.minute = "0" + this.minute;
          }
          if (this.second < 10) {
            this.second = "0" + this.second;
          }
          this.doing = this.hour + ":" + this.minute + ":" + this.second;
          if (jian < 0) {
            n++;
            if(n<2){
              clearInterval(this.timer);
            }
            clearInterval(this.timer);
            this.doing = '结束课程';
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

  }
}
