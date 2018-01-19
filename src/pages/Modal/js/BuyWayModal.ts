import {Component} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";

@IonicPage({
  name:'BuyWayModal',
  segment:'BuyWayModal'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/BuyWayModal.html',
})
export class BuyWayModal {
  way:number;
  constructor(private viewCtrl:ViewController,private navParams:NavParams) {
    this.way=this.navParams.get("way");
  }
  select(type){
    this.viewCtrl.dismiss({type:type});
  }

}
