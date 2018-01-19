import {Component} from "@angular/core";
import {MenuController, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {CommonService} from "../providers/CommonService";
import {SplashScreen} from "@ionic-native/splash-screen";
import { Buffer } from 'buffer';
declare var wx;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'tabsPage';


  constructor(platform: Platform,
              statusBar: StatusBar,
              private commonService:CommonService,
              private menuCtrl:MenuController,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.enable(false);
      this.initWxUser();

    });

  }

  initWxUser() {
    let param = {
      r:'wx_api.init',
      url:new Buffer('http://www.fitness2u.cn/apps/ls/www/?').toString('base64')
      // url:new Buffer('http://www.fitness2u.cn/apps/ceshi/www/?').toString('base64')
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.result.wx.appId,
          nonceStr: res.result.wx.nonceStr,
          signature: res.result.wx.signature,
          timestamp: res.result.wx.timestamp,
          jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'openLocation', 'getLocation', 'scanQRCode', 'chooseWXPay'] // 必填，需要使用的JS接口列表
        });
        wx.ready(() => {
          console.log('初始化js-sdk成功');
        });
        wx.error(res => {
          console.log('初始化js-sdk失败' + res.errMsg);
        });

      } else {
        location.href = 'http://www.fitness2u.cn/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&teacher=0'
      }

    });

  }
}
