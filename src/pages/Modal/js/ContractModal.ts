import {Component} from "@angular/core";
import {IonicPage, NavController, ViewController} from "ionic-angular";
@Component({
  selector: 'page-modal',
  templateUrl: '../template/ContractModal.html'
})
@IonicPage({
  name: 'ContractModal',
  segment: 'ContractModal'
})

export class ContractModal {
  contractTime: number = 1;
  monthStartDate;
  monthEndDate;
  now = new Date();
  nowDayOfWeek = this.now.getDay(); //今天本周的第几天
  nowDay = this.now.getDate() + 1; //当前 日
  nowMonth = this.now.getMonth(); //当前 月
  nowYear = this.now.getFullYear(); //当前 年

  contractType = '周合约';
  contractUnit='周';
  contractData = {
    id: 0,
    timeSlice: '',
    num:0
  };


  constructor(private navCtrl:NavController,
              private viewCtrl: ViewController) {
  }

  sure() {
    // this.appCtrl.getRootNav().push('SureOrderClassPage', {data: this.contractData});
    this.navCtrl.push('SureOrderClassPage', {data: this.contractData});
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


  time() {
    let n = this.contractTime;

    if (n == 1) {
      this.getWeekStartDate();
    } else {
      this.getMonthDate(n);
    }
    this.contractData.id = n;
    if (this.contractData.id == 1) {
      this.contractType = '周合约';
      this.contractUnit='周';
      this.contractData.num=5;
    }
    if (this.contractData.id == 0) {
      this.contractType = '月合约';
      this.contractUnit='月';
      this.contractData.num=20;
    }
    if (this.contractData.id == 2) {
      this.contractType = '季合约';
      this.contractUnit='季';
      this.contractData.num=60;
    }
    if (this.contractData.id == 11) {
      this.contractType = '年合约';
      this.contractUnit='年';
      this.contractData.num=180;
    }
  }


  formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }

    return (myyear + "." + mymonth + "." + myweekday);
  }

  //周
  getWeekStartDate() {
    let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay);
    let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + 6);
    let a = this.formatDate(weekStartDate);
    let b = this.formatDate(weekEndDate);
    this.contractData.timeSlice = (a + "—" + b);
    return this.contractData.timeSlice;
  }

  getMonthDays(myMonth) {
    this.monthStartDate = new Date(this.nowYear, myMonth, 1);
    this.monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
    let days = (this.monthEndDate - this.monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }

  //一月，季，年（0：一月，2：季，11：年）
  getMonthDate(i) {
    let monthStartDate1 = new Date(this.nowYear, this.nowMonth, this.nowDay);
    let n: number = this.nowMonth;
    let quarterEndMonth = Math.floor(n) + Math.floor(i);
    let monthEndDate1 = new Date(this.nowYear, quarterEndMonth, (this.getMonthDays(quarterEndMonth)) + this.nowDay);
    let a1 = this.formatDate(monthStartDate1);
    let b1 = this.formatDate(monthEndDate1);
    this.contractData.timeSlice = a1 + "—" + b1;
    return this.contractData.timeSlice;
  }

}
