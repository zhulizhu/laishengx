import {Component} from "@angular/core";
import {IonicPage, ModalController} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";
import {Storage} from "@ionic/storage";

@IonicPage({
  name: 'SurePayPage',
  segment: 'SurePayPage'
})

@Component({
  selector: 'page-orderclass',
  templateUrl: 'surePay.html'
})

export class SurePayPage {
  btnYes = 'btn-active';
  btnNo = 'btn';
  oid:number;
  myModalPrompt;


  constructor(
    private myModal:ModalController,
    private commonService:CommonService,
    private storage:Storage
  ) {

  }

  /**
   * 离开该页面
   */
  ionViewDidLeave(){

    if(this.myModalPrompt){
      this.myModalPrompt.dismiss();
    }

  }

  /**
   * 确认支付
   */

  subPay(){
    // let param=this.navParams.get('param');
    // this.commonService.getResult(param).then(res => {
    //   if (res.status == 1) {
    //     this.oid=res.result.orderId;
        // let paramPay = {
        //   r: 'wx_api.pay.orderPay',
        //   oid: this.oid
        // };

    this.storage.get('oid').then(oid=>{
      let param={
        r:'wx_api.pay.orderPay',
        oid:oid
      };
      // this.http.getPay(
      //   'http://jss.gllehong.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=wx_api.pay.orderPay&oid='+oid
      // ).map((res:Response)=>res.json()).subscribe(json=>{
      this.commonService.getResult(param).then(json=>{


        // parent.wx.chooseWXPay({
        //   timestamp: json.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //   nonceStr: json.result.nonceStr, // 支付签名随机串，不长于 32 位
        //   package: json.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //   signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //   paySign: json.result.paySign, // 支付签名
        //   success: function (res) {
        //     let myModal = this.myModal.create('SuccessModal');
        //     myModal.present();
        //   },
        //   error: function (res) {
        //     alert('支付失败');
        //   }
        // });
      })
    });

  }

  /**
   * 购买方式
   */
  prompt() {
    this.btnYes = 'btn';
    this.btnNo = 'btn-active';
    this.myModalPrompt = this.myModal.create('PromptModal');
    this.myModalPrompt.onDidDismiss(res => {
      if (res != 1) {
        this.btnYes = 'btn-active';
        this.btnNo = 'btn';
      }else if(res==1){
        // this.navCtrl.push('BuyclassPage');
      }
    });
    this.myModalPrompt.present();
  }

  only() {
    this.btnYes = 'btn-active';
    this.btnNo = 'btn';
  }
}
