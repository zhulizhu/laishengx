import {Component} from "@angular/core";
import {AlertController, IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

declare var wx;

@IonicPage({
  name: 'HelpOrderclassPage',
  // segment: 'HelpOrderclassPage/:id/:timeYd/:endTime/:storeaddress/:reminder'
  segment: 'HelpOrderclassPage'
})

@Component({
  selector: 'page-orderclass',
  templateUrl: 'orderclass.html',
  providers: [CommonService]
})


export class HelpOrderclassPage {
  way: number = -1;
  time = {  //课时开始时间
    hours: 0,
    minutes: 0,
  };
  startTime;
  endTime;
  btnYes = 'btn-active';
  btnNo = 'btn';
  btnYesName = 0;//购买方式 0：单课支付 1：合约支付
  goodsId;
  timeYd;
  timeMin;
  timeMax;
  timeEnd;
  timeXi = (60 / 60) * 60 * 60;
  param = {};
  orderId: number;
  item = {   // 预约
    addressid: '',
    total: '',
    marketprice: '',
    wholesaleprice: '',
    subtitle: '',
    goodsid: "",
    cates: '',
    type: '',
    reminder: ''
  };
  price;
  itemx = { //提交订单

  };
  couponNum = 0;
  sucssId;
  storeaddress;

  coupons = {
    id: '',
    contype: '',
    deduct: ''
  };
  couponsList;
  discountprice = 0;
  realprice = 0;

  myModalCoupons;
  myModalPrompt;
  myModalSuccess;
  myModalSuccessPay;
  myModalBuyWay;
  reminder;
  course_type;
  payType = 0;

  constructor(private myModal: ModalController,
              private LoadCtrl: LoadingController,
              private commonService: CommonService,
              private storage: Storage,
              private alerting:AlertController,
              public navCtrl: NavController,) {
    // this.goodsId = this.navParams.get('id');
    // this.timeYd = this.navParams.get('timeYd');
    // this.endTime = this.navParams.get('endTime');
    // this.storeaddress = this.navParams.get('storeaddress');
    // this.reminder = this.navParams.get('reminder');


    //获取开始时间和结束时间

  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.storage.get('param').then(data => {
        this.goodsId = data.id;
        this.timeYd = data.timeYd;
        this.endTime = data.endTime;
        this.storeaddress = data.storeaddress;
        this.reminder = data.reminder;

        this.course_type = data.course_type;

        this.startTime = data.timeYd;
        let a = new Date(this.timeYd * 1000);
        this.timeMax = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 20, 0, 0);
        this.timeJian(a, this.timeXi);
      })
      this.orderclass();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });
  }


  /**
   * 离开该页面
   */
  ionViewDidLeave() {
    if (this.myModalCoupons) {
      this.myModalCoupons.dismiss();
    }
    if (this.myModalPrompt) {
      this.myModalPrompt.dismiss();
    }
    if (this.myModalSuccess) {
      this.myModalSuccess.dismiss();
    }
    if (this.myModalSuccessPay) {
      this.myModalSuccessPay.dismiss();
    }
    if (this.myModalBuyWay) {
      this.myModalBuyWay.dismiss();
    }
  }

//预约订单
  orderclass() {
    this.storage.get('param').then(data => {
      this.goodsId = data.id;
      this.timeYd = data.timeYd;
      this.endTime = data.endTime;
      this.storeaddress = data.storeaddress;
      this.reminder = data.reminder;
      this.course_type = data.course_type;

      this.startTime = data.timeYd;
      let a = new Date(this.timeYd * 1000);
      this.timeMax = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 20, 0, 0);
      this.timeJian(a, this.timeXi);

      this.param = {
        r: 'wx_api.order.create',
        id: this.goodsId,
        liveid: 0,
        optionid: 0,
        total: 1,
        reminder: ''
      };

      this.commonService.getResult(this.param).then(res => {
        if (res.status == 1) {
          this.item = res.result;
          this.item.addressid = res.result.addressid;
          this.item.subtitle = res.result.subtitle;
          this.item.total = res.result.goods[0].total;
          this.item.marketprice = res.result.goods[0].marketprice;
          this.item.wholesaleprice = res.result.goods[0].wholesaleprice;
          this.item.goodsid = res.result.goods[0].goodsid;
          this.item.cates = res.result.goods[0].cates;
          this.item.type = res.result.goods[0].type;
          this.price = res.result.goods[0].marketprice;
          this.haveCoupon();
        }
      })

    }, error => {
      console.log(error)
    });

  }

  /**
   * 查看有无优惠券
   */

  haveCoupon() {
    let param = {
      r: 'wx_api.order.create.caculate',
      goodsid: this.item.goodsid,
      total: this.item.total,
      marketprice: this.item.marketprice,
      cates: this.item.cates,
      type: this.item.type
    };
    this.commonService.getResult(param).then(resHave => {
      if (resHave.status == 1) {
        this.discountprice = resHave.result.discountprice;
        this.realprice = resHave.result.realprice;
        this.price = Number(resHave.result.realprice);
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
      goodsid: this.item.goodsid,
      total: this.item.total,
      marketprice: this.item.marketprice,
      cates: this.item.cates,
      goodstype: this.item.type
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.couponsList = JSON.stringify(res.result.coupons);
      } else {

      }
    })
  }

  /**
   * 提交订单
   */
  subPresent(couponsid, price) {
    let subParam;
    if (couponsid) {
      subParam = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice: Number(price),
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        test: 1,
        pay_type: 'wechat',
        couponid: couponsid,
        contype: 2,
      };
    } else {
      subParam = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice: price,
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        test: 1,
        pay_type: 'wechat'
      };
    }
    if (this.btnYesName == 0 && this.payType == 0) {
      this.commonService.getResult(subParam).then(res => {
        let _thisA = this;
        if (res.status == 1) {
          this.sucssId = res.result.orderid;
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
              if (res.result.orderid) {
                _thisA.commonService.getResult(successParam).then(resul => {
                  if (resul.status == 1) {
                    _thisA.myModalSuccessPay = _thisA.myModal.create('SuccessModal', {sure: 0});
                    _thisA.myModalSuccessPay .onDidDismiss(res=>{
                      if(res==1){
                        _thisA.navCtrl.push('CoursePage',{type:1})
                      }
                    });
                    _thisA.myModalSuccessPay.present();
                  } else {
                    alert(resul.result.message);
                  }
                })
              }
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
    } else if (this.btnYesName == 0 && this.payType == 1) {
      subParam.pay_type='credit';
      let alerting=this.alerting.create({
        title:'余额支付',
        message:'确定使用余额支付吗？？',
        buttons:[
          {
            text: '取消',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: '确定',
            handler: () => {

              this.commonService.getResult(subParam).then(res => {
                if (res.status == 1) {
                  this.myModalSuccess = this.myModal.create('SuccessModal', {sure: 0});
                  this.myModalSuccess.onDidDismiss(res=>{
                    if(res==1){
                      this.navCtrl.push('CoursePage',{type:1})
                    }
                  });
                  this.myModalSuccess.present();
                } else {
                  alert(res.result.message);
                  this.ionViewDidEnter();
                }
              })
            }
          }
        ]
      });
      alerting.present();
    } else {
      subParam.pay_type = 'agreement';

      this.commonService.getResult(subParam).then(res => {

        if (res.status == 1) {
          if (res.result.result) {
            this.myModalSuccess = this.myModal.create('SuccessModal', {sure: 0});
            this.myModalSuccess.onDidDismiss(res=>{
              if(res==1){
                this.navCtrl.push('CoursePage',{type:1})
              }
            });
            this.myModalSuccess.present();
          } else {
            alert(res.result.message);
          }
        } else if (res.status == -1) {
          this.myModalPrompt = this.myModal.create('PromptModal');
          this.myModalPrompt.onDidDismiss(res => {
            if (res == 1) {
              this.navCtrl.push('BuyclassPage');
            }
          });
          this.myModalPrompt.present();
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }
      })
    }


  }


  ProjeModal() {
    let myModal = this.myModal.create('ProjectModal');
    myModal.onDidDismiss(() => {

    });
    myModal.present();
  }


  BuyWay() {
    this.myModalBuyWay = this.myModal.create('' +
      '' +
      '', {way: this.way});
    this.myModalBuyWay.onDidDismiss((res) => {
      this.way = res.type;
    });
    this.myModalBuyWay.present();
  }

  buyCard() {
    this.navCtrl.push('BuycardPage');
  }

  buyCoupons(couponsList, marketprice) {

    this.myModalCoupons = this.myModal.create('CouponsPage', {couponsList: couponsList});
    this.myModalCoupons.onDidDismiss(res => {
      this.coupons = res;
      this.price = Number(marketprice) - Number(res.deduct);
    });
    this.myModalCoupons.present();
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
   * 支付方式
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
