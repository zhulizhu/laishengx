import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavParams, ViewController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name:'CouponsPage',
  segment:'CouponsPage/:couponsList'
})

@Component({
  selector:'coupons',
  templateUrl:'coupons.html'
})

export class CouponsPage{
  lists=[];
  nowTime;
  type;
  couponsList=[];
  constructor(private viewCtrl:ViewController,
              private commonService:CommonService,
              private navParams:NavParams,
              private loadCtrl:LoadingController){
    this.nowTime=this.commonService.timeStamp();
    this.type=this.navParams.get('couponsList');
  }

  ionViewDidEnter(){
    let loading = this.loadCtrl.create({
    });
    loading.present();

    setTimeout(() => {
      if(this.type==0){
        this.couponList();
      }else {
        this.lists=JSON.parse(this.navParams.get('couponsList'));
        for(let i=0;i<this.lists.length;i++){
          let b=[];
          this.lists[i].tagtitle='领取';
          b=this.lists[i].tagtitle.replace(/(.)(?=[^$])/g,"$1,").split(",");
          this.lists[i].tagtitle=b;
        }
      }
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }

  /**
   * 抵用券列表
   */
  couponList(){
    let param={
      r:'sale.coupon.getlist'
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){

       this.lists=res.result.list;
       for(let i=0;i<res.result.list.length;i++){
         let b=[];
         b=res.result.list[i].tagtitle.replace(/(.)(?=[^$])/g,"$1,").split(",");
         res.result.list[i].tagtitle=b;
       }
      }
    })
  }

  /**
   * 选择抵用券
   */

  coupon(item,type){
    //backtype 0:立减 1：折扣 2:返现
    let coupon={
      id:item.id,
      contype:item.contype,
      deduct:item.deduct
    };
    if(type){
      this.viewCtrl.dismiss(coupon);
    }else {
      alert('该优惠券已经过期，不能使用');
    }

  }

}
