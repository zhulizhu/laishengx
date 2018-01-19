/**
 * Created by 聚米粒 on 2017/6/20.
 */
import {Injectable} from "@angular/core";
import { APP_SERVICE_URL} from "./Common";
import {HttpService} from "./HttpService";
import {ToastController} from "ionic-angular";

@Injectable()
export class CommonService {
    public img;
    public path;
    public urlpath;
    constructor(public httpService: HttpService, private toastCtrl: ToastController) {
    }

    getItems(param) {

            return this.httpService.post(APP_SERVICE_URL, param);

    }

    getResult(param) {
            return this.httpService.post(APP_SERVICE_URL, param);
    }

    getVersion(param) {
        return this.httpService.post(APP_SERVICE_URL, param);
    }

    getTimeStamp(time) {
        var parts = time.match(/\d+/g);
        return new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
    }

    getStrtotime(time) {
        return this.getTimeStamp(time) / 1000;
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
  /**
   * 判断json是否为空
   * @param e
   * @returns {boolean}
   */
  isEmptyObject(e) {
    let t;
    for (t in e)
      return !0;
    return !1
  }

  /**
   * 当前时间戳
   */
  public timeStamp(){

    let time=Math.round(new Date().getTime()/1000);
    return time;
  }

  /**
   * 周
   * @param firstday
   * @returns {any}
   */
  public getWeekNum(time) {
    let week;
    let firstday=new Date(time*1000).getDay();
    if (firstday == 0) {
      week = "日";
    } else if (firstday == 1) {
      week = "一";
    } else if (firstday == 2) {
      week = "二";
    } else if (firstday == 3) {
      week = "三";
    } else if (firstday == 4) {
      week = "四";
    } else if (firstday == 5) {
      week = "五";
    } else if (firstday == 6) {
      week = "六";
    }
    return week;
  }

}
