///<reference path='../../app/wechat/wechat.d.ts'/>
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {MD5} from "../../provices/MD5";
import {CommonService} from "../../provices/CommonService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mi;
a;
  constructor(private http: Http, private MD5: MD5,private c:CommonService) {


  }

  pay() {
    // this.getData();
  }


  // getData() {
  //   this.mi_md5();
  //   // let url=location.href.split("#")[0];
  //   let data = {
  //     appId: 'wxd9714d0b96c61d84',
  //     timestamp: new Date().getTime(),
  //     nonceStr: Math.random().toString(36).substr(2),
  //     signature: this.mi,
  //     prepay_id: ''
  //   };
  //   console.log(data.nonceStr);
  //   WeixinJSBridge.invoke('getBrandWCPayRequest',
  //     {
  //       appId: data.appId,
  //       timestamp: data.timestamp,
  //       nonceStr: data.nonceStr,
  //       packages: data.prepay_id,
  //       signType: 'MD5',
  //       paySign: data.signature
  //     },
  //     function (res) {
  //       if(res.err_msg==='get_brand_wcpay_request:ok'){
  //         alert("11")
  //       }else {
  //         alert("22")
  //       }
  //     }
  //   );
  //
  //
  // }
  pay1(){
    this.mi_md5();
    let param = {
      appId: 'wxd9714d0b96c61d84',
      mch_id:1490206412,
      timestamp: new Date().getTime(),
      nonce_str: Math.random().toString(36).substr(2),
      sign: this.mi,
      body:'aa',
      out_trade_no:new Date().getTime(),
      total_fee:0.01,
      spbill_create_ip:'120.77.178.180',
      notify_url:'c',
    };
    // $.ajax({
    //
    // })

    this.c.getPay(param).then(res=>{
      this.a=res.success;
    })
    //
    // if (typeof WeixinJSBridge == "undefined"){
    //   if( document.addEventListener ){
    //     document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    //   }else if (document.){
    //     document.attachEvent('WeixinJSBridgeReady', jsApiCall);
    //     document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    //   }
    // }else{
    //   jsApiCall();
    // }
  }

  private mi_md5() {
    let stringA = 'appid=wxd9714d0b96c61d84&body=test&device_info=1000' +
      'mch_id=1490206412&nonce_str=' + Math.random().toString(36).substr(2) + '';
    let stingSignTemp = stringA + "&key=33108119871227101262148502517115";
    this.mi = this.MD5.md5(stingSignTemp, '', '');
    return this.mi;
  }
}
