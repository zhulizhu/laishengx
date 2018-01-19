import {IonicPage, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {CommonService} from "../../providers/CommonService";

@IonicPage({
  name:'DoorPage',
  segment:'DoorPage'
})

@Component({
  templateUrl:'door.html',
  selector:'door'
})

export class DoorPage {

  lists=[];

  constructor(private commonService:CommonService,private navCtrl:NavController){
    this.doorList();
  }


  /**
   * 门店列表
   */
  doorList() {
    let param = {
      r: 'wx_api.getAllStore',
      status:1
    };
    this.commonService.getResult(param).then(res => {
      this.lists=res.result.list;
    })
  }

  course(id){
    this.navCtrl.push('HelpPage',{id:id});
  }
}

