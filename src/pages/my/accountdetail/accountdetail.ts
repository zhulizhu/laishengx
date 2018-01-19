import { Component} from "@angular/core";
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'AccountdetailPage',
  segment:'AccountdetailPage'
})
@Component({
  selector: 'page-accountdetail',
  templateUrl: 'accountdetail.html'
})

export class AccountdetailPage {

  myDate=new Date().toISOString();

  time=new Date().toISOString();
  today=this.getToday(this.myDate);
  maxDate=new Date().toISOString();
  page:number;
  total0;
  total1;
  // list0=[];
  // lists0=[];

  list0=[
    {
      createtime:'',
      money:'',
      typestr:'',
      title:''
    }
  ];
  lists0=[];
  list1=[
    {
      createtime:'',
      money:'',
      typestr:'',
      title:''
    }
  ];
  lists1=[];
  show0=1;
  show1=1;


  constructor(private commonService:CommonService,
              private LoadCtrl:LoadingController){

  }

  /**
   * 加载完成
   */
  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.accountDetail(1,this.today);
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }


  /**
   * 选择时间
   * @param myDate
   */
  changeTime(myDate){
    this.today=this.getToday(myDate);
    this.accountDetail(1,this.today);
  }

  /**
   * 明细列表
   */
  accountDetail(page,time){
    let nowTime=this.commonService.timeStamp();
    if(!page||page==1){
      page=1;
      this.list0=[];
      this.lists0=[];
    }

    let paramtype0={
      r:'member.log.get_list',
      page:page,
      type:0,
      _:nowTime,
      time:time
    };

    this.commonService.getResult(paramtype0).then(res=>{
      if(res.status==1){
        this.list0=res.result.list;
        for(let i=0;i<res.result.list.length;i++){
          res.result.list[i].num=Math.abs(res.result.list[i].num)
        }
        this.lists0=this.lists0.concat(this.list0);
        this.total0=res.result.total?res.result.total:0;

        this.page=page;
        if(!this.list0.length){
          this.show0=0;
        }else {
          this.show0=1;
        }
      }else {

      }
    });

    let paramtype1={
      r:'member.log.get_list',
      type:1,
      page:page,
      _:nowTime,
      time:time
    };
    this.commonService.getResult(paramtype1).then(res=>{
      if(res.status==1){
        this.list1=res.result.list;
        this.lists1=this.lists1.concat(this.list1);
        this.total1=res.result.total?res.result.total:0;
        this.page=page;
        if(!this.list1.length){
          this.show1=0;
        }else {
          this.show1=1;
        }
      }else {


      }
    })

  }

  /**
   * 向下刷新
   */
  doInfinite(Infinite) {
    setTimeout(() => {
      this.page += 1;
      this.accountDetail(this.page,this.today);
      Infinite.complete();
    }, 2000);
  }


  /**
   *
   */
  getToday(time) {
    let date = time;
    let year = date.slice(0,4);
    let month = date.slice(5,7)-1;
    return new Date(year,month).getTime()/1000;
  }


}
