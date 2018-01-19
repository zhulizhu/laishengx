import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {CommonJs} from "../../../providers/CommonJs";
import {Storage} from "@ionic/storage";
declare var wx;

@IonicPage({
  name: 'TeamdetailPage',
  segment: 'TeamdetailPage/:id/:week'
})

@Component({
  selector: './page-helpdetail',
  templateUrl: 'teamdetail.html'
})

export class TeamdetailPage {
  week;
  cid:number;
  param={};
  item={};
  teacherDes:any;
  content;
  contentArray=[];
  content1;
  content1Array=[];
  content2;
  content2Array=[];
  content3;
  content3Array=[];
  content4;
  content4Array=[];

  constructor(
    private navCtrl: NavController,
    public navParams:NavParams,
    private comJs:CommonJs,
    private LoadCtrl:LoadingController,
    private commonService: CommonService,
    private storge:Storage,
  ) {
    this.cid=navParams.get('id');
    this.week="星期"+navParams.get('week');

  }

  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.listDetail();
      setTimeout(()=>{
        loading.dismiss();
      },500)
    });
  }
  /**
   * 详情
   */


  listDetail() {
    this.param = {
      r: "wx_api.goods.goods_detail",
      id:this.cid
    };
    this.commonService.getResult(this.param).then(res => {
      if(res.status==1){
        this.item= res.result.goods;
        let a=this.commonService.isEmptyObject(res.result.goods.teacher);
        this.teacherDes= a?this.comJs.contentText(res.result.goods.teacher.desc):'完善中……';
        this.content=this.comJs.contentText(res.result.goods.content);
        this.content1=this.comJs.contentText(res.result.goods.content1);
        this.content1Array=this.comJs.conArray(this.content1);
        this.content2=this.comJs.contentText(res.result.goods.content2);
        this.content2Array=this.comJs.conArray(this.content2);
        this.content3=this.comJs.contentText(res.result.goods.content3);
        this.content3Array=this.comJs.conArray(this.content3);
        this.content4=this.comJs.contentText(res.result.goods.content4);
        this.content4Array=this.comJs.conArray(this.content4)
      }else{
        this.item={};
      }

    });

  }

  OrderClass(id,time,Endtime,storeaddress,reminder,course_type) {
    this.storge.set("param",{id: id,timeYd:time,endtime:Endtime,storeaddress,reminder:reminder,course_type:course_type})
    this.navCtrl.push('HelpOrderclassPage')
  }

  /**
   * 定位
   */
  location(storelat,storelng,storeaddress,city,province){
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        wx.openLocation({
          latitude: Number(storelat), // 纬度，浮点数，范围为90 ~ -90
          longitude: Number(storelng), // 经度，浮点数，范围为180 ~ -180。
          name:'', // 位置名
          address: storeaddress, // 地址详情说明
          scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      },
      cancel:function (res) {

      }
    });
  }

}
