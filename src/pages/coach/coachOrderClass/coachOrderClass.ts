import {Component} from "@angular/core";
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";
declare var wx;

@IonicPage({
  name: 'CoachorderclassPage',
  segment: 'CoachorderclassPage'
})
@Component({
  selector: 'page-orderclass',
  templateUrl: 'coachOrderClass.html',
  providers: [CommonService]
})

export class CoachorderclassPage {

  way: number = -1;
  time = {  //课时开始时间
    hours: 0,
    minutes: 0,
  };
  param = {};
  item = {   // 预约
    addressid: '',
    total: '',
    marketprice: '',
    marketprice1: '',
    marketprice2: '',
    wholesaleprice: '',
    personNum: 1,
    subtitle: '',
    goods: [],
    goodsid: "",
    cates: '',
    type: '',
    reminder: ''
  };
  startTime;
  Endtime;
  myTip: number = 1;
  orderId;
  timeYd;
  goods = [];
  //授课方式 对应的价钱
  personOne = 'btn-active';
  btnYes = 'btn-active';
  btnNo = 'btn';
  btnYesName = 0;//购买方式 0：单课支付 1：合约支付
  reminder;
  couponNum = 0;
  storeaddress;

  couponsList;
  coupons = {
    id: '',
    deduct: '',
  };
  price;
  person;
  discountprice = 0;
  realprice = 0;
  myModalSuccess;
  myModalSuccessAgre;
  myModalPrompt;
  myModalBuyWay;
  myModalCoupons;
  myModalSuccessCredit;
  course_type;
  payType = 0;

  constructor(private myModal: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private LoadCtrl: LoadingController,
              private alerting: AlertController,
              private commonService: CommonService,
              private storage: Storage) {

  }

  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.orderclass();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    }, 300);
  }

  /**
   * 离开该页面
   */

  ionViewDidLeave() {
    if (this.myModalSuccess) {
      this.myModalSuccess.dismiss();
    }
    if (this.myModalSuccessAgre) {
      this.myModalSuccessAgre.dismiss();
    }
    if (this.myModalPrompt) {
      this.myModalPrompt.dismiss();
    }
    if (this.myModalBuyWay) {
      this.myModalBuyWay.dismiss();
    }
    if (this.myModalCoupons) {
      this.myModalCoupons.dismiss();
    }
    if (this.myModalSuccessCredit) {
      this.myModalSuccessCredit.dismiss();
    }
  }

  //预约订单
  orderclass() {
    this.storage.get('param').then(
      data => {
        this.orderId = data.id;
        this.timeYd = data.timeYd;
        this.Endtime = data.Endtime;
        this.storeaddress = data.storeaddress;
        this.person = data.person;
        this.reminder = data.reminder;
        this.course_type = data.course_type;
        //获取开始时间和结束时间0
        this.startTime = data.timeYd;
        this.param = {
          r: 'wx_api.order.create',
          id: this.orderId,
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
            this.item.goodsid = res.result.goods[0].goodsid;
            this.item.marketprice1 = res.result.goods[0].marketprice1;
            this.item.marketprice2 = res.result.goods[0].marketprice2;
            this.item.marketprice = this.person == '1' || this.person == '0' ? this.item.marketprice1 : this.item.marketprice2;
            this.price = this.person == '1' || this.person == '0' ? this.item.marketprice1 : this.item.marketprice2;
            this.item.wholesaleprice = res.result.goods[0].wholesaleprice;
            this.goods = res.result.goods;
            if (this.person == '2') {
              this.personOne = '';
              this.item.personNum = 2;
            }
            this.haveCoupon();
          } else {
            this.ionViewDidEnter();
          }
        })
      },
      error => {
        alert(error)
      }
    )

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
      goodsid: this.item.goods[0].goodsid,
      total: this.item.total,
      marketprice: this.item.marketprice,
      cates: this.item.goods[0].cates,
      goodstype: this.item.goods[0].type
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.couponsList = JSON.stringify(res.result.coupons);
      } else {

      }
    })
  }

  /**
   * 确定支付
   */
  sure(couponsid, price) {
    let n = 0;
    let a = this.item.goods;
    for (let i = 0; i < a.length; i++) {
      this.item.goodsid = a[i].goodsid;
      this.item.cates = a[i].cates;
      this.item.type = a[i].type;
    }

    let paramSubmit;
    if (couponsid) {
      paramSubmit = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice: price,
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        couponid: couponsid,
        contype: 2,
        personNum: this.item.personNum ? this.item.personNum : 1,
        test: 1,
        pay_type: 'wechat'
      };
    } else {
      paramSubmit = {
        r: 'wx_api.order.create.submit',
        total: this.item.total,
        marketprice: price,
        goodsid: this.item.goodsid,
        cates: this.item.cates,
        type: this.item.type,
        submit: true,
        personNum: this.item.personNum ? this.item.personNum : 1,
        test: 1,
        pay_type: 'wechat'
      };
    }
    if (this.btnYesName == 0 && this.payType == 0) {//微信支付
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
                  _thisA.myModalSuccess = _thisA.myModal.create('SuccessModal', {sure: 0});
                  _thisA.myModalSuccess.onDidDismiss(res => {
                    if (res == 1) {
                      _thisA.navCtrl.push('CoursePage', {type: 1})
                    }
                  });
                  _thisA.myModalSuccess.present();
                } else {
                  alert(resul.message);
                  this.ionViewDidEnter();
                }
              });
            },
            error: function (res) {
              alert(res.result.message);
            }
          });
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }
      });
    } else if (this.btnYesName == 0 && this.payType == 1) {//余额支付
      paramSubmit.pay_type = 'credit';
      let alerting = this.alerting.create({
        title: '余额支付',
        message: '确定使用余额支付吗？？',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: '确定',
            handler: () => {
              this.commonService.getResult(paramSubmit).then(res => {
                if (res.status == 1) {
                  this.myModalSuccessCredit = this.myModal.create('SuccessModal', {sure: 0});
                  this.myModalSuccessCredit.onDidDismiss(res => {
                    if (res == 1) {
                      this.navCtrl.push('CoursePage', {type: 1})
                    }
                  });
                  this.myModalSuccessCredit.present();
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

    } else {//合约支付
      paramSubmit.pay_type = 'agreement';
      this.commonService.getResult(paramSubmit).then(res => {
        if (res.status == 1) {
          if (res.result.result) {
            this.myModalSuccessAgre = this.myModal.create('SuccessModal', {sure: 0});
            this.myModalSuccessAgre.onDidDismiss(res => {
              if (res == 1) {
                this.navCtrl.push('CoursePage', {type: 1})
              }
            });
            this.myModalSuccessAgre.present();
          } else {
            alert(res.result.message);
          }
        } else if (res.status == -1) {
          alert(res.result.message);
          this.myModalPrompt = this.myModal.create('PromptModal');
          this.myModalPrompt.onDidDismiss(res => {
            if (res != 1) {
              this.btnYes = 'btn-active';
              this.btnNo = 'btn';
              this.btnYesName = 0;
              this.ionViewDidEnter();
            } else if (res == 1) {
              this.navCtrl.push('BuyclassPage');
            }
          });
          this.myModalPrompt.present();
        } else {
          alert(res.result.message);
          n++;
          this.ionViewDidEnter();
          if (n > 2) {
            this.navCtrl.setRoot('')
          }
        }
      })
    }

  }

  /**
   * 授课方式
   */

  personNumber(num) {
    this.item.marketprice = num == 1 ? this.item.marketprice1 : this.item.marketprice2;
    this.price = num == 1 ? this.item.marketprice1 : this.item.marketprice2;
    if (num == 1) {
      this.item.personNum = 1;
      this.personOne = 'btn-active';
    } else {
      this.item.personNum = 2;
      this.personOne = '';
    }
  }

  buyCard() {
    this.navCtrl.push('BuycardPage');
  }


  ProjeModal() {
    let myModal = this.myModal.create('ProjectModal');
    myModal.onDidDismiss(() => {

    });
    myModal.present();
  }

  BuyWay() {
    this.myModalBuyWay = this.myModal.create('BuyWayModal');
    this.myModalBuyWay.onDidDismiss((res) => {
      this.way = res.type;
    });
    this.myModalBuyWay.present();
  }

  buyCoupons(couponsList, price) {
    this.myModalCoupons = this.myModal.create('CouponsPage', {couponsList: couponsList});
    this.myModalCoupons.onDidDismiss(res => {
      this.coupons = res;
      this.price = Number(price) - Number(res.deduct);
    });
    this.myModalCoupons.present();
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
