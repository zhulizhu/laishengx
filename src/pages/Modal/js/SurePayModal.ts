import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";



@IonicPage({
  name:'SurePayModal',
  segment:'SurePayModal'
})

@Component({
  selector:'page-modal',
  templateUrl:'../template/SurePayModal.html'
})
export class SurePayModal{
  constructor(){

  }

  subPay(){
    // let oid=this.navParams.get('oid');
    // let param={
    //   r:'wx_api.pay.orderPay',
    //   oid:oid
    // };

    // location.href='http://jss.gllehong.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=wx_api.pay.orderPay&oid='+oid;
    // this.http.getPay(
    //   'http://jss.gllehong.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=wx_api.pay.orderPay&oid='+oid
    // ,window.location.href).map((res:Response)=>res.json()).subscribe(json=>{
    // // this.commonService.getResult(param).then(json=>{

      // wx.chooseWXPay({
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
    // })

  }

}
