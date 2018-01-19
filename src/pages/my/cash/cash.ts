import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name: 'CashPage',
  segment: 'CashPage/:credit'
})
@Component({
  selector: '../recharge/recharge',
  templateUrl: 'cash.html'
})
export class CashPage {
  credit;
  money: number;

  constructor(private navParams: NavParams,
              private commonService: CommonService,
              private navVtrl: NavController) {

    this.credit = this.navParams.get('credit');
  }

  recharge() {
    if (this.money < 100) {
      alert('提现金额 最低100元');
      return false;
    }
    if(this.money>this.credit){
      alert('提现金额不能大于账户余额');
      return false;
    }
    let param = {
      r: 'member.withdraw.submit',
      money: this.money,
      applytype: 0
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        alert('待审核');
        this.navVtrl.push('RemoneyPage');

      } else {
        alert(res.result.message);
      }
    })
  }
}
