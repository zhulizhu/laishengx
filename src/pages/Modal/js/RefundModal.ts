import {Component} from "@angular/core";
import {IonicPage,NavParams, ViewController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'RefundModal',
  segment:'RefundModal'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/RefundModal.html'
})

export class RefundModal {
  type;
  remark;
  items;

  constructor(private viewCtrl:ViewController,
              private commonService:CommonService,
              private navParams:NavParams) {


    this.items=[
      {id:0,remark:'不想上课了'},
      {id:1,remark:'预约时间段当天有事不能上课'},
      {id:2,remark:'预约错误'},
      {id:3,remark:'预约时间冲突'},
      {id:4,remark:'预约不满意'},
      {id:5,remark:'其他'}
    ]

  }


  /**
   * 确定取消
   */
  sure(){
    this.type=this.navParams.get('type');
    let orderid=this.navParams.get('id');
    if(!this.remark){
      alert('请选择退款方式，谢谢');
      return false;
    }

    if(this.type==0){
      let param={
        r:'order.op.cancel',
        id:orderid,
        remark:this.remark
      };
      this.commonService.getResult(param).then(res=>{
        if(res.status==1){
          this.viewCtrl.dismiss(1);
        }else {
          alert(res.result.message);

        }
      })
    }else {
      let price=this.navParams.get('price');
      let param={
        r:'order.refund.submit',
        id:orderid,
        rtype:0,
        reason:this.remark,
        price:price
      };
      this.commonService.getResult(param).then(res=>{
        if(res.status==1){
          this.viewCtrl.dismiss(1);
        }else {
          alert(res.result.message);
          this.viewCtrl.dismiss();
        }
      })
    }

  }
  /**
   * 取消
   */
  cancel(){
    this.viewCtrl.dismiss()
  }
}
