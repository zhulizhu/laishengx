import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";
declare var wx;
@IonicPage({
  name: 'MyOrderClassPage',
  segment: 'MyOrderClassPage'
})
@Component({
  selector: 'page-orderclass',
  templateUrl: 'myorderclass.html'
})

export class MyOrderClassPage {
  orderid;
  itemJson={
    startTime:'',
    endtime:'',
    course_type:3,
    marketprice:0,
    marketprice1:0,
    marketprice2:0,
    personNum:0,
    storeaddress:'',
    reminder:''
  };

  btnYes = 'btn-active';
  btnNo = 'btn';
  btnYesName = 0;//购买方式 0：单课支付 1：合约支付

  //授课方式 对应的价钱
  personOne = 'btn-active';

  couponNum = 0;
  myModalPrompt;
  myModalSuccess;
  myModalSuccessPay;


  constructor(private myModal: ModalController,
              private commonService: CommonService,
              private storage: Storage,
              private LoadCtrl:LoadingController,
              private navCtrl: NavController) {



  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.storage.get('param').then(
        data => {
          this.orderid = data.id;
          this.itemJson = JSON.parse(data.itemStr);
        },
        error => {

        }
      );
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    },500);
  }
  /**
   * 离开该页面
   */
  ionViewDidLeave() {
    if (this.myModalPrompt) {
      this.myModalPrompt.dismiss();
    }
    if (this.myModalSuccess) {
      this.myModalSuccess.dismiss();
    }

  }

  /**
   * 查看有无优惠券
   */

  haveCoupon() {
    let param = {
      r: 'wx_api.order.create.caculate',
      // goodsid:this.item.goods[0].goodsid,
      // total:this.item.total,
      // marketprice:this.item.marketprice,
      // cates:this.item.goods[0].cates,
      // type:this.item.goods[0].type
    };

    this.commonService.getResult(param).then(resHave => {
      if (resHave.status == 1) {
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
      // goodsid:this.item.goods[0].goodsid,
      // total:this.item.total,
      // marketprice:this.item.marketprice,
      // cates:this.item.goods[0].cates,
      // goodstype:this.item.goods[0].type
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {

      } else {

      }
    })
  }

  /**
   * 授课方式
   */

  personNumber(num) {
    this.itemJson.marketprice = num == 1 ? this.itemJson.marketprice1 : this.itemJson.marketprice2;
    if (num == 1) {
      this.itemJson.personNum = 1;
      this.personOne = 'btn-active';
    } else {
      this.itemJson.personNum = 2;
      this.personOne = '';
    }
  }

  /**
   * 支付方式
   */
  prompt() {
    this.btnYes = 'btn';
    this.btnNo = 'btn-active';
    this.btnYesName = 1;
    this.myModalPrompt = this.myModal.create('PromptModal');
    this.myModalPrompt.onDidDismiss((res) => {
      if (res != 1) {
        this.btnYes = 'btn-active';
        this.btnNo = 'btn';
      }
    });
    this.myModalPrompt.present();
  }

  only() {
    this.btnYesName = 0;
    this.btnYes = 'btn-active';
    this.btnNo = 'btn';
  }

  sure(orderid,time) {
    let nowTime = this.commonService.timeStamp();
    if (time < nowTime - 15 * 60) {
      alert('已经超过了上课时间，不能预约');
      return false;
    }
    let param = {
      r: 'wx_api.pay.orderPay',
      orderid: orderid,
      pay_type: 'wechat'
    };

    this.commonService.getVersion(param).then(json => {

      let _thisA = this;
      wx.chooseWXPay({
        timestamp: json.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: json.result.nonceStr, // 支付签名随机串，不长于 32 位
        package: json.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: json.result.paySign, // 支付签名
        success: function (res) {
          let successParam = {
            r: 'wx_api.pay.complete',
            id: json.result.orderid
          };
          if (res.result.orderid) {
            _thisA.commonService.getResult(successParam).then(resul => {
              if (resul.status == 1) {
                _thisA.myModalSuccessPay = _thisA.myModal.create('SuccessModal', {sure: 0});
                _thisA.myModalSuccessPay.onDidDismiss(res=>{
                  if(res==1){
                    _thisA.navCtrl.push('CoursePage',{type:0})
                  }
                });
                _thisA.myModalSuccessPay.present();
              } else {
                alert(resul.result.message);
              }
            })
          }
        },
        error: function (res) {
          alert('支付失败');
        }
      });
    });
    // let myModal=this.myModal.create('SuccessModal');
    // myModal.present();
  }

  buyCard() {
    this.navCtrl.push('BuycardPage');
  }
}
