import {Component} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";

@IonicPage({
  name:'PartnerPage',
  segment:'PartnerPage'
})
@Component({
    selector: 'page-partner',
    templateUrl: 'partner.html'
})
export class PartnerPage {

  realname;
  mobile;
  weinum;
  display=0;

    constructor(public navCtrl: NavController,
                private commonService:CommonService) {

    }

    sub(){
      if(this.display!=1){
        alert('请认真查看合约服务条款，并同意');
        return false;
      }
      let regex =/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
      if(!regex.test(this.mobile)){
        alert('请正确输入手机号码');
        return false;
      }

      let param={
        r:'globonus.register',
        realname:this.realname,
        mobile:this.mobile,
        weinum:this.weinum
      };
      this.commonService.getResult(param).then(res=>{
        if(res.status==1){
          alert('申请成功，请等待');
        }else {
          alert(res.message)
        }
      })
    }
  Coachgrade(){
    // this.navCtrl.push('CoachGradePage');
  }

  /**
   * 阅读服务条款
   */

  read(){
    this.navCtrl.push('ProtocolPage',{type:1});
  }
}

