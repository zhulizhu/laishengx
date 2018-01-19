import {Component} from "@angular/core";
import {IonicPage, ModalController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";


@IonicPage({
  name: 'TeamOrderclassPage',
  segment: 'TeamOrderclassPage/:id/:timeYd'
})

@Component({
  selector: 'page-orderclass',
  templateUrl: 'teamOrderClass.html',
  providers: [CommonService]
})

export class TeamOrderclassPage {
  way: number = -1;
  time = {  //课时开始时间
    hours: 0,
    minutes: 0,
  };
  startTime;
  btnYes = 'btn-active';
  btnNo = 'btn';
  orderId;
  timeYd;
  // timeMin;
  timeMax;
  timeEnd;
  timeXi = (60 / 60) * 60 * 60;
  param = {};
  item = {   // 预约
    addressid:'',
    total:'',
    marketprice:'',
    wholesaleprice:'',
    subtitle:'',
    goodsid:"",
    cates:'',
    type:'',
    goods:[]
  };


  goods = [];

  constructor(private myModal: ModalController,
              private navParams: NavParams,
              private commonService: CommonService,
              public navCtrl: NavController,) {
    this.orderId = this.navParams.get('id');
    this.timeYd = this.navParams.get('timeYd');

    this.time.hours = new Date(this.timeYd * 1000).getHours();
    this.time.minutes = new Date(this.timeYd * 1000).getMinutes();
    this.startTime = this.time.hours + ":" + this.time.minutes;
    let a = new Date(this.timeYd * 1000);
    this.timeMax = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 20, 0, 0);
    this.timeJian(a, this.timeXi);

    this.orderclass();


  }

  click2() {
    let a=this.item.goods;
    for (var i=0;i<a.length;i++){
      this.item.goodsid=a[i].goodsid;
      this.item.cates=a[i].cates;
      this.item.type=a[i].type;
    }

    let paramSubmit = {
      r:'wx_api.order.create.submit',
      total:this.item.total,
      marketprice:this.item.marketprice,
      goodsid:this.item.goodsid,
      cates:this.item.cates,
      type:this.item.type,
      submit:true
    };
    this.commonService.getResult(paramSubmit).then(res => {
      console.log(res);
      if(res.status==1){
        let param={
          r:'wx_api.pay.orderPay',
          oid:res.result.orderid
        };
        this.commonService.getVersion(param).then(json => {
          console.log(json);
          parent.wx.chooseWXPay({
            timestamp: json.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: json.result.nonceStr, // 支付签名随机串，不长于 32 位
            package: json.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: json.result.paySign, // 支付签名
            success: function (res){
              let myModal=this.myModal.create('SuccessModal');
              myModal.present();
            },
            error:function (res) {
              alert('支付失败');
            }
          });
        });
      }
    });

  }


  //预约订单
  orderclass() {
    this.param = {
      r: 'wx_api.order.create',
      id: this.orderId,
      liveid: 0,
      optionid: 0,
      total: 1
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.item = res.result;
        this.item.addressid = res.result.addressid;
        this.item.subtitle = res.result.subtitle;
        this.item.total = res.result.goods[0].total;
        this.item.marketprice = res.result.goods[0].marketprice;
        this.item.wholesaleprice = res.result.goods[0].wholesaleprice;
        this.goods = res.result.goods;
      } else {
        this.item = {
          addressid:'',
          total:'',
          marketprice:'',
          wholesaleprice:'',
          subtitle:'',
          goodsid:"",
          cates:'',
          type:'',
          goods:[]
        };
      }

    })
  }

  /**
   * 时间端
   */

  timeJian(time, num) {
    time = new Date(time / 1000).getTime();
    num = new Date(num).getTime();
    this.timeEnd = new Date((num + time) * 1000);
    return this.timeEnd;
  }


  selectTime(time) {
    let a = new Date(this.timeYd * 1000);
    let b1 = parseInt(time.slice(0, 2));
    let b2 = time.slice(3, 5);
    let t = new Date(a.getFullYear(), a.getMonth(), a.getDate(), b1, b2).getTime();
    this.timeJian(t, this.timeXi);
  }

  // sure() {
  //   this.click2();
  //   // this.WxPay();
  //   // this.initWxJsSdk();
  //   // let myModal=this.myModal.create('SuccessModal');
  //   // myModal.present();
  // }

  ProjeModal() {
    let myModal = this.myModal.create('ProjectModal');
    myModal.onDidDismiss(() => {

    });
    myModal.present();
  }

  BuyWay() {
    let myModal = this.myModal.create('BuyWayModal', {way: this.way});
    myModal.onDidDismiss((res) => {
      this.way = res.type;
    });
    myModal.present();
  }

  buyCard() {
    this.navCtrl.push('BuycardPage');
  }

  buyCoupons() {
    this.navCtrl.push('CouponsPage');
  }

  prompt() {
    this.btnYes = 'btn';
    this.btnNo = 'btn-active';
    let myModal = this.myModal.create('PromptModal');
    myModal.onDidDismiss((res) => {
      if (res != 1) {
        this.btnYes = 'btn-active';
        this.btnNo = 'btn';
      }
    });
    myModal.present();
  }


  only() {
    this.btnYes = 'btn-active';
    this.btnNo = 'btn';
  }
}
