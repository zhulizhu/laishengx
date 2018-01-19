import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {TabsPage} from "../../tabs/tabs";

declare var wx;

@IonicPage({
  name: 'TeamOrderclassPage',
  segment: 'TeamOrderclassPage/:id/:timeYd/:Endtime/:storeaddress/:reminder'
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
  Endtime;
  btnYes = 'btn-active';
  btnNo = 'btn';
  btnYesName = 0;//购买方式 0：单课支付 1：合约支付
  orderId;
  timeYd;
  // timeMin;
  timeMax;
  timeEnd;
  timeXi = (60 / 60) * 60 * 60;
  param = {};
  item = {   // 预约
    addressid: '',
    total: '',
    marketprice: '',
    wholesaleprice: '',
    subtitle: '',
    goodsid: "",
    cates: '',
    type: '',
    goods: [],
    reminder:''
  };
  couponNum = 0;
  storeaddress;
  goods = [];

  couponsList;
  coupons={
    id:'',
    contype:'',
    deduct:''
  };
  price;
  discountprice=0;
  realprice=0;

  myModalCoupons;
  myModalPay;
  myModalBuy;
  reminder;
  constructor(private myModal: ModalController,
              private navParams: NavParams,
              private commonService: CommonService,
              private LoadCtrl: LoadingController,
              public navCtrl: NavController,) {
    this.orderId = this.navParams.get('id');
    this.timeYd = this.navParams.get('timeYd');
    this.Endtime = this.navParams.get('Endtime');
    this.storeaddress = this.navParams.get('storeaddress');
    this.reminder = this.navParams.get('reminder');

    this.time.hours = new Date(this.timeYd * 1000).getHours();
    this.time.minutes = new Date(this.timeYd * 1000).getMinutes();
    this.startTime = new Date(this.timeYd * 1000);
    let a = new Date(this.timeYd * 1000);
    this.timeMax = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 20, 0, 0);
    this.timeJian(a, this.timeXi);
  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.orderclass();
      setTimeout(()=>{
        loading.dismiss();
      },500)

    });

  }

  /**
   * 离开该页面
   */
  ionViewDidLeave(){
    if(this.myModalCoupons){
      this.myModalCoupons.dismiss();
    }
    if(this.myModalPay){
      this.myModalPay.dismiss();
    }
    if(this.myModalBuy){
      this.myModalBuy.dismiss();
    }
  }

  //预约订单
  orderclass() {
    this.param = {
      r: 'wx_api.order.create',
      id: this.orderId,
      liveid: 0,
      optionid: 0,
      total: 1,
      reminder:''
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.item = res.result;
        this.item.addressid = res.result.addressid;
        this.item.subtitle = res.result.subtitle;
        this.item.total = res.result.goods[0].total;
        this.item.marketprice = res.result.goods[0].marketprice;
        this.price = res.result.goods[0].marketprice;
        this.item.wholesaleprice = res.result.goods[0].wholesaleprice;
        this.goods = res.result.goods;
        this.haveCoupon();
      } else {
        this.item = {
          addressid: '',
          total: '',
          marketprice: '',
          wholesaleprice: '',
          subtitle: '',
          goodsid: "",
          cates: '',
          type: '',
          goods: [],
          reminder:''
        };
      }

    })
  }

  /**
   * 查看有无优惠券
   */

  haveCoupon() {
    let param = {
      r: 'wx_api.order.create.caculate',
      goodsid: this.item.goods[0].goodsid,
      total: this.item.total,
      marketprice: this.item.marketprice,
      cates: this.item.goods[0].cates,
      type: this.item.goods[0].type
    };

    this.commonService.getResult(param).then(resHave => {
      if (resHave.status == 1) {
        this.discountprice=resHave.result.discountprice;
        this.realprice=resHave.result.realprice;
        this.price=Number(resHave.result.realprice);
        if (resHave.result.couponcount > 0) {
          this.couponNum = resHave.result.couponcount;
          this.couponList();
        }
      } else {

      }
    })
  }

  /**
   * 优惠券列表
   */

  couponList() {
    let param = {
      r: 'wx_api.sale.util.query',
      goodsid: this.item.goods[0].goodsid,
      total: this.item.total,
      marketprice: this.item.marketprice,
      cates: this.item.goods[0].cates,
      goodstype: this.item.goods[0].type
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.couponsList=JSON.stringify(res.result.coupons)
      } else {

      }
    })
  }

  /**
   * 提交订单
   */

  pay(couponsid,price) {
    let a = this.item.goods;
    for (let i = 0; i < a.length; i++) {
      this.item.goodsid = a[i].goodsid;
      this.item.cates = a[i].cates;
      this.item.type = a[i].type;
    }
    let paramSubmit;
    if(couponsid){
      paramSubmit = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice:price,
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        couponid:couponsid,
        contype:2,
        test: 1,
        pay_type: 'wechat'
      };
    }else {
      paramSubmit = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice:price,
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        test: 1,
        pay_type: 'wechat'
      };
    }

    // if (this.btnYesName == 0) {
      //单课支付
      this.commonService.getResult(paramSubmit).then(res => {
        let _thisA = this;
        if (res.status == 1) {
          wx.chooseWXPay({
            timestamp: res.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.result.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.result.paySign, // 支付签名
            success: function (json) {
              let successParam = {
                r: 'wx_api.pay.complete',
                id: res.result.orderid
              };
              _thisA.commonService.getResult(successParam).then(resul => {
                if (resul.status == 1) {
                  _thisA.myModalPay = _thisA.myModal.create('SuccessModal',{sure:0});
                  _thisA.myModalPay.present();
                } else {
                  alert(resul.result.message);
                  this.navCtrl.push(TabsPage);
                }
              })
            },
            error: function (json) {
              alert('支付失败');
            }
          });
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }
      });
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


  /**
   * 购买合约套餐 弹框
   * @constructor
   */
  BuyWay() {
    this.myModalBuy = this.myModal.create('BuyWayModal', {way: this.way});
    this.myModalBuy.onDidDismiss((res) => {
      this.way = res.type;
    });
    this.myModalBuy.present();
  }

  /**
   * 会员卡
   */
  buyCard() {
    this.navCtrl.push('BuycardPage');
  }

  /**
   * 抵用券
   */
  buyCoupons(couponsList,marketprice) {
    this.myModalCoupons = this.myModal.create('CouponsPage',{couponsList:couponsList});
    this.myModalCoupons.onDidDismiss(res => {
      this.coupons=res;
      this.price=Number(marketprice)-Number(res.deduct);
    });
    this.myModalCoupons.present();
  }

  /**
   * 购买方式
   */
  prompt() {
    this.btnYes = 'btn';
    this.btnNo = 'btn-active';
    this.btnYesName = 1;
  }

  only() {
    this.btnYesName = 0;
    this.btnYes = 'btn-active';
    this.btnNo = 'btn';
  }
}
