import {IonicPage, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";
declare var wx;

@IonicPage({
  name: 'RechargePage',
  segment: 'RechargePage'
})
@Component({
  selector: 'recharge',
  templateUrl: 'recharge.html'
})
export class RechargePage {
  money: number;
  credit=0;
  agree: number = 0;

  constructor(private commonService: CommonService,
              private storage: Storage,
              private navCtrl: NavController) {

    this.storage.get('param').then(
      data => {
        this.credit = data.credit;
      },
      error => {

      }
    );
  }

  recharge() {
    if (this.agree != 1) {
      alert('请认真查看合约服务条款，并同意');
      return false;
    }

    if (this.money >= 0 && this.money < 100) {
      alert('最低充值￥100.00');
      return false;
    }
    let param = {
      r: 'member.recharge.submit',
      money: this.money,
      type: 'wechat'
    };
    this.commonService.getResult(param).then(res => {
      let _thisA = this;
      if (res.status == 1) {
        wx.chooseWXPay({
          timestamp: res.result.wechat.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.result.wechat.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.result.wechat.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.result.wechat.paySign, // 支付签名
          success: function (json) {
            let successParam = {
              r: 'member.recharge.wechat_complete',
              logid: res.result.logid
            };
            if (res.result.logid) {
              _thisA.commonService.getResult(successParam).then(resul => {
                if (resul.status == 1) {
                  _thisA.navCtrl.push('RemoneyPage');
                } else {
                  alert(resul.result.message)
                }
              })
            }
          },
          error: function (json) {
            alert('支付失败');
          }
        });
      } else {

      }
    })

  }

  /**
   * 阅读服务条款
   */

  read(){
    this.navCtrl.push('ProtocolPage',{type:3});
  }
}
