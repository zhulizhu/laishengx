import {Component} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import { Buffer } from 'buffer';
@IonicPage({
  name:'InforModal',
  segment:'InforModal/:type'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/InforModal.html'
})

export class InforModal {

  type:1;
  basicInfor={
    sex:1,
    year:0,
    height:0,
    weight:0,
    skeletal_muscle:0,
    fat:0,
    water:0,
    leanWeight:0,
    massIndex:0,
    weightPercent:0,
    waist:0,
    basic:0,
    muscle:0,
    fatControl:0,
  };

  constructor(private viewCtrl:ViewController,
              private commonService:CommonService,
              private navParams:NavParams) {
    this.type=this.navParams.get('type');
    this.basicInfor=this.navParams.get('inform');

  }



  sure(){

    let infor;
    infor=this.basicInfor;
    infor=JSON.stringify(infor);
    infor=new Buffer(infor).toString('base64');

    let param={
      r:'wx_api.user.update_userinfo',
      data:infor
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.viewCtrl.dismiss(1);
      }else {
        alert(res.result.message)
      }
    })
  }

  cancel(){
    this.viewCtrl.dismiss()
  }


}
