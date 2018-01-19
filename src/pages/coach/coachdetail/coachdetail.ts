import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {CommonJs} from "../../../providers/CommonJs";
import {Storage} from "@ionic/storage";

declare var wx;

@IonicPage({
  name: 'CoachdetailPage',
  segment: 'CoachdetailPage/:id/:week'
})
@Component({
  selector: 'page-coachdetail',
  templateUrl: 'coachdetail.html'
})

export class CoachdetailPage {
  week: any;
  cid: number;
  param = {};
  item = {};
  teacherDes: any;
  content;
  content1;
  content2;
  content3;
  content4;
  data = {
    page: 1,
    timeYd: this.getToday(),//默认当天的年月日时间戳
    type: '1'
  };
  list = [];
  lists = [];
  itemx = [];
  dataTime;
  openid;
  contentArray=[];
  content1Array=[];
  content2Array=[];
  content3Array=[];
  content4Array=[];

  constructor(private navCtrl: NavController,
              public NavParams: NavParams,
              private comJs:CommonJs,
              private LoadCtrl:LoadingController,
              private storage:Storage,
              private commonService: CommonService,) {
    this.cid = NavParams.get('id');
    this.week = "星期" + NavParams.get('week');

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
    }, 300);
  }

  // 详情
  listDetail() {
    this.param = {
      r: "wx_api.goods.goods_detail",
      id: this.cid
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.item = res.result.goods;
        this.teacherDes =res.result.goods.teacher.length?this.comJs.contentText(res.result.goods.teacher.desc):'完善中……';
        this.content =this.comJs.contentText(res.result.goods.content);
        this.contentArray=this.comJs.conArray(this.content);
        this.content1 =this.comJs.contentText(res.result.goods.content1);
        this.content1Array=this.comJs.conArray(this.content1);

        this.content2 =this.comJs.contentText(res.result.goods.content2);
        this.content2Array=this.comJs.conArray(this.content2);

        this.content3 =this.comJs.contentText(res.result.goods.content3);
        this.content3Array=this.comJs.conArray(this.content3);

        this.content4 =this.comJs.contentText(res.result.goods.content4);
        this.content4Array=this.comJs.conArray(this.content4);
        this.openid = res.result.goods.teacher.openid;
        this.teacherList(this.data,res.result.goods.teacher.openid);
      } else {
        this.item = {};
      }

    });

  }

  /**
   * 教练列表
   */

  teacherList(data,openid) {

    this.list=[];
    if (data.page == 1) {
      this.itemx = [];
    }
    this.param = {
      r: "wx_api.goods.get_list_by_coach",
      openid:openid
    };
    this.commonService.getResult(this.param).then(res => {
      if(res.status==1){
        this.lists= res.result.list;
        for(let i=0;i<this.lists.length;i++){
          this.dataTime = this.turnDate(new Date(this.lists[i].course_starttime*1000).toISOString());
          if(this.lists[i].course_type==this.data.type && this.dataTime== Number(this.data.timeYd)){
            this.list.push(this.lists[i]);
            this.list=this.undulpicate(this.list);
          }
        }
        this.itemx = this.itemx.concat(this.list);
      }else{
        this.lists=[];
      }
    });

  }


  /**
   *获取当前日期
   * @returns {number}
   */
  getToday() {
    let date = new Date().toISOString();
    let todayTime = date.slice(0, 10);
    return new Date(Date.parse(todayTime) / 1000).getTime();
  }

  /**
   * 删除刷新重复数据
   * @param array
   * @returns {any}
   */
  undulpicate(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i].id === array[j].id) {
          array.splice(j, 1);
          j--;
        }
      }
    }
    return array;
  }
//将年月日时分秒时间搓转化成年月日时间搓
  turnDate(e) {
    let getTimes = e.slice(0, 10);
    return new Date(Date.parse(getTimes) / 1000).getTime();
  }
  /**
   * OrderClass
   * @param id
   * @param time
   * @param Endtime
   * @constructor
   */

  OrderClass(id, time, Endtime,storeaddress,person,reminder) {
    this.storage.set('param',{id: id, timeYd: time, Endtime:Endtime,storeaddress:storeaddress,person:person,reminder:reminder})
    // this.app.getRootNav().setRoot('CoachorderclassPage')
    this.navCtrl.push('CoachorderclassPage')
  }

  OrderClassTable(id, time, Endtime,storeaddress,person,reminder,course_type){
    if(course_type==1){
      this.storage.set('param',{id: id, timeYd: time, Endtime:Endtime,storeaddress:storeaddress,person:person,reminder:reminder})
      // this.app.getRootNav().setRoot('CoachorderclassPage')
      this.navCtrl.push('CoachorderclassPage')
    }else if(course_type==2||course_type==3){
      this.navCtrl.push('HelpdetailPage',{id: id, week: time,course_type:course_type})
    }
  }
  AllCourse(openid) {
    this.navCtrl.push('CourseTablePage', {openid: openid})
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
