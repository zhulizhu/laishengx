import {Component} from "@angular/core";
import {IonicPage, NavController, ModalController, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";
declare var wx;


@IonicPage({
  name: 'SureOrderClassPage',
  segment: 'SureOrderClassPage'
})
@Component({
  selector: 'sureorderclass',
  templateUrl: 'sureorderclass.html'
})

export class SureOrderClassPage {
  item = {
    id: '',
    price: '',
    name: 0,
    value: 0
  };
  agree: number = 0;
  myModalSuccess;

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
          if(data){
            this.item.id = data.id;
            this.item.price = data.price;
            this.item.name = data.name;
            this.item.value = data.value;
          }else {
            this.item = {
              id: '',
              price: '',
              name: 0,
              value: 0
            };
          }

        }
      );
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });
  }

  /**
   * 离开该页面
   */
  ionViewDidLeave() {
    if (this.myModalSuccess) {
      this.myModalSuccess.dismiss();
    }

  }

  sure(id, price) {
    if (this.agree != 1) {
      alert('请认真查看合约服务条款，并同意');
      return false;
    }

    let subParam = {
      r: 'wx_api.recharge.submit',
      aid: id,
      money: price,
      type: 'wechat'
    };
    this.commonService.getResult(subParam).then(res => {
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
              r: 'wx_api.recharge.wechat_complete',
              logid: res.result.logid
            };
            _thisA.commonService.getResult(successParam).then(resul => {
              if (resul.status == 1) {
                _thisA.myModalSuccess = _thisA.myModal.create('SuccessModal', {sure: 1});
                _thisA.myModalSuccess.onDidDismiss(res=>{
                  if(res==1){
                    _thisA.navCtrl.push('CoursePage',{type:0})
                  }
                });
                _thisA.myModalSuccess.present();
              } else {
                alert(resul.result.message)
              }

            })
          },
          error: function (json) {
            alert('支付失败');
          }
        });
      } else {
        this.item = {
          id: '',
          price: '',
          name: 0,
          value: 0
        };
      }
    });

  }


  buyCard() {
    this.navCtrl.push('BuycardPage');
  }

  /**
   * 阅读服务条款
   */

  read(){
    this.navCtrl.push('ProtocolPage',{type:2});
  }
}
