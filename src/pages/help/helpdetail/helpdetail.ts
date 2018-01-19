import { Component,ViewChild} from "@angular/core";
import {Slides, IonicPage, NavParams, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {CommonJs} from "../../../providers/CommonJs";
import {Storage} from "@ionic/storage";

declare var wx;

@Component({
  selector: 'page-helpdetail',
  templateUrl: 'helpdetail.html'
})
@IonicPage({
  name:'HelpdetailPage',
  segment:'HelpdetailPage/:id/:week/:course_type',
  // segment:'HelpdetailPage',
})
export class HelpdetailPage {
  @ViewChild('mySlider') slider: Slides;

  mySlider = {
    autoPlay: 2000,
    initialSlide: 0,
    pager: true,
    loop: true,
    speed: 300
  };
  week;
  cid;
  course_type=3;
  param = {};
  item = {};
  content;
  contentArray=[];
  content1;
  content1Array=[];
  content2;
  content2Array=[];
  content4;
  content4Array=[];
  teacherDes;

  constructor(
    // private navCtrl: NavController,
    public navParams:NavParams,
    private comJs:CommonJs,
    private LoadCtrl:LoadingController,
    private storage:Storage,
    private commonService: CommonService,
    private navCtrl:NavController,
  ) {
    this.cid=navParams.get('id');
    this.week="星期"+navParams.get('week');
    this.course_type=this.navParams.get('course_type');
  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.listDetail();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });
  }


  // 详情
  listDetail() {

    this.param = {
      r: "wx_api.goods.goods_detail",
      id:this.cid
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.item = res.result.goods;
        //教师
        if(this.course_type==2){
          let a=this.commonService.isEmptyObject(res.result.goods.teacher);
          this.teacherDes= a?this.comJs.contentText(res.result.goods.teacher.desc):'完善中……';
        }

        // 门店介绍
        this.content=this.comJs.contentText(res.result.goods.content);
        this.contentArray=this.comJs.conArray(this.content);
        // 健身优势
        this.content1=this.comJs.contentText(res.result.goods.content1);
        this.content1Array=this.comJs.conArray(this.content1);
        // 注意事项
        this.content2=this.comJs.contentText(res.result.goods.content2);
        this.content2Array=this.comJs.conArray(this.content2);
        // 适合人群
        this.content4=this.comJs.contentText(res.result.goods.content4);
        this.content4Array=this.comJs.conArray(this.content4)

      } else {
        this.item = {};
      }
    });

  }
  onViewWillEnter() {
    this.slider.startAutoplay();
  }

  ionViewWillLeave() {
    if(this.course_type==3){
      this.slider.stopAutoplay();
    }

  }

  ngOnInit() {//页面加载完成后自己调用
    if(this.navParams.get('course_type')==3){
      setInterval(() => {
        this.slider.slideNext(300, true);
      }, 2000);
    }

  }


  OrderClass(id,time,endTime,storeaddress,reminder,course_type) {
    this.storage.set('param',{'id': id,'timeYd':time,'endTime':endTime,'storeaddress':storeaddress,'reminder':reminder,course_type:course_type});
    this.navCtrl.push('HelpOrderclassPage');
    // this.app.getRootNav().setRoot('HelpOrderclassPage');
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
          name: province+city, // 位置名
          address: storeaddress, // 地址详情说明
          scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      },
      cancel:function (res) {

      }

    });
  }

}
