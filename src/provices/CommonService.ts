import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {ToastController} from "ionic-angular";
@Injectable()
export class CommonService {
  public img;
  public path;
  public weekth;
  APP_SERVICE_URL=''

  constructor(public httpService: HttpService, private toastCtrl: ToastController) {

  }

  getItems(param) {

    return this.httpService.post(this.APP_SERVICE_URL, param);

  }

  getResult(param) {
    return this.httpService.post(this.APP_SERVICE_URL, param);

  }

  getVersion(param) {
    return this.httpService.post(this.APP_SERVICE_URL, param);
  }

  getPay(param) {
    return this.httpService.post('http://jss.gllehong.com/WxpayAPI_php_v3/example/jsapi.php',param);
  }

  getTimeStamp(time) {
    var parts = time.match(/\d+/g);
    return new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
  }

  getStrtotime(time) {
    return this.getTimeStamp(time) / 1000;
  }


  getWeekNum(firstday) {
    if (firstday == 0) {
      this.weekth = "日";
    } else if (firstday == 1) {
      this.weekth = "一";
    } else if (firstday == 2) {
      this.weekth = "二";
    } else if (firstday == 3) {
      this.weekth = "三";
    } else if (firstday == 4) {
      this.weekth = "四";
    } else if (firstday == 5) {
      this.weekth = "五";
    } else if (firstday == 6) {
      this.weekth = "六";
    }
    return this.weekth;
  }

  myToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    toast.present();
  }
}
