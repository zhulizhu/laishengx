import {Component, NgZone, ViewChild} from "@angular/core";
import {IonicPage, NavController, LoadingController, AlertController, Slides, Content, NavParams} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";
import {CommonJs} from "../../providers/CommonJs";

declare var wx;


@IonicPage({
  name: 'HelpPage',
  segment: 'HelpPage'
})
@Component({
  selector: './page-team',
  templateUrl: 'help.html',
  providers: [CommonService]
})

export class HelpPage {
  @ViewChild('mySlider') slider: Slides;
  @ViewChild(Content) content: Content;
  infoArray = ["base_0", "base_1", "base_2", "base_3", "base_4", "base_5", "base_6"];
  info = this.infoArray[0];
  mySlider = {
    autoPlay: 2000,
    initialSlide: 0,
    pager: true,
    loop: true,
    speed: 300
  };

  week = [];
  weekth: any;
  lianTime = "";
  // 时间选择
  lastMidYear = 0;//上一个年份
  lastMidMonth = 0;//上一个年份
  lastMidDay = 0;//上一个年份
  firstday: number;
  i: number;

  param = {};
  storename = '';//门店名
  currentHours = new Date().getHours(); //获取当前小时
  timeLength: number;//当前时间差
  itemA = [];
  itemx = [];
  lists: any;

  data = {
    page: 1,
    timeYd: this.getToday(),//默认当天的年月日时间戳
    type: "3"
  };
  list: any;
  course_type: '';
  dataTime;
  door = [];
  doorV=[];
  bannerList = [];
  addressOpen;
  storeid;

  loadCtrling=false;
  loading;
  constructor(public navCtrl: NavController,
              private commonService: CommonService,
              private alert: AlertController,
              private comJs:CommonJs,
              private ngzone: NgZone,
              private navParams:NavParams,
              public LoadCtrl: LoadingController) {
    this.getTimeDay();
    this.doorList('');
    this.storeid=this.navParams.get('id');
  }


  ionViewDidEnter() {
    // let loading = this.LoadCtrl.create({});
    // loading.present();
    // setTimeout(() => {
    //   this.getList(this.data);
    //   this.banner();
    //
    //   // console.log(this.loadCtrling=true);
    //
    // });
    this.loading = this.LoadCtrl.create({});
    this.loading.present();
    setTimeout(() => {
      this.getList(this.data);
      this.banner();
    });

  }

  ionViewDidLoad() {

  }

  /**
   * 轮播图
   */

  banner() {
    let param = {
      r: 'wx_api.banner'
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.bannerList = res.result.list;
      } else {
        alert(res.message);
      }
    })
  }

  /**
   * 门店列表
   */
  doorList(item) {
    let param = {
      r: 'wx_api.getAllStore',
      status:1
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.door = res.result.list;
        if(this.storeid){
          for(let i=0;i<res.result.list.length;i++){
            if(res.result.list[i].id==this.storeid){
              this.door=[res.result.list[i]];
            }
          }
        }else {
          this.door = res.result.list;
        }
        if(item&&item.length!=0){
          this.addressOpen=res.result.list[this.comJs.cancelArray(item)[0]];
          this.storename = res.result.list[this.comJs.cancelArray(item)[0]].storename;
        }else {
          this.addressOpen=this.door[0];
          this.storename = this.door[0].storename;
        }

        this.content.ionScroll.subscribe(($event: any) => {
          this.ngzone.run(() => {
            let a=[];
            //如果在页面滑动过程中对数据进行修改，页面是不会重构的。所以在对应的操作中需要使用如下方法，使页面能够重构。
            for(let i=0;i<this.itemx.length;i++){
              if(a.length>0){
                let b=a[a.length-1]+document.getElementById('a'+i).offsetHeight;
                a.push(b);
              }else {
                let b=document.getElementById('a'+i).offsetHeight;
                a.push(b);
              }
            }
            for(let i=0;i<a.length;i++){
              if(a.length<2){
                if(a[i]<=$event.scrollTop){
                  this.storename=this.door[i].storename;
                  this.addressOpen=res.result.list[i];
                }
              }else {
                if(i<1){
                  this.storename=this.door[i].storename;
                  this.addressOpen=res.result.list[i];
                }else{
                  if(a[i]>=$event.scrollTop&&a[i-1]<=$event.scrollTop){
                    this.storename=this.door[i].storename;
                    this.addressOpen=res.result.list[i];
                  }
                }
              }
            }
          })
        })
      } else {
        alert(res.message);
      }
    })
  }
  /**
   *自助列表
   * @param data
   */
  getList(data) {
    this.list = [];
    this.itemA = [];
    if (data.page == 1) {
      this.itemx = [];
      this.itemA = [];
    }
    this.data.page = data.page;
    this.param = {
      r: "wx_api.goods.get_list",
      course_type: this.data.type,
      page: this.data.page,
      time: this.data.timeYd
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.lists = res.result.list;
        this.loadCtrling=true;
        if(this.loadCtrling){
          setTimeout(() => {
            this.loading.dismiss();
          },500);
        }
        for (let i = 0; i < this.lists.length; i++) {
          this.dataTime = this.turnDate(this.lists[i].course_starttime);
          this.lists[i].course_starttime=new Date((res.result.list[i].course_starttime)*1000).toISOString()
          if (this.lists[i].course_type == this.data.type && this.dataTime == Number(this.data.timeYd)) {
            this.list.push(this.lists[i]);
            this.list = this.undulpicate(this.list);
            for (let j = 0; j < this.list.length; j++) {
              let startTime = this.list[j].course_starttime;//获取课时开始时间
              this.timeLength = new Date(parseInt(startTime) * 1000).getHours() - this.currentHours; //判断课程是否紧张状态
              this.storename = this.list[0].storename;
            }
          }
        }
        this.itemA = this.itemA.concat(this.list);
        this.doorV=[];
        for (let i = 0; i < this.door.length; i++) {
          this.itemx.push([]);
          for (let j = 0; j < this.itemA.length; j++) {
            if (this.door[i].storename == this.itemA[j].storename) {
              // this.addressOpen=this.door[0];
              this.doorV.push(i);
              this.itemx[i].push(this.itemA[j]);
            }
          }
        }


        this.doorList(this.doorV)

      } else {
        this.lists = [];
      }
    });

  };


  /**
   * 详情
   */

  helpDtail(id, week, salesreal, total) {
    if (parseInt(total) > parseInt(salesreal) && parseInt(salesreal) >= 0) {
      this.navCtrl.push('HelpdetailPage', {id: id, week: week,course_type:3});
    } else {
      let myAlert = this.alert.create({
        title: '不好意思',
        subTitle: '该课程<span>已经满员</span>，请选择其他的课程',
        buttons: ['确定']
      });
      myAlert.present();
    }
  }


  //获取当前日期
  getToday() {
    let date = new Date().toISOString();
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let todayTime = year + "/" + month + "/" + day;
    return new Date(Date.parse(todayTime) / 1000).getTime();
  }

  //将年月日时分秒时间搓转化成年月日时间搓
  turnDate(e) {
    let time = new Date(parseInt(e) * 1000);
    let year=time.getFullYear();
    let month=time.getMonth();
    let day=time.getDate();
    return new Date(year,month,day,0,0,0).getTime()/1000;
  }

  //删除刷新重复数据
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

  // 加载更多
  // doInfiniteMember(Infinite) {
  //   setTimeout(() => {
  //     this.data.page += 1;
  //     this.getList(this.data);
  //     Infinite.complete();
  //   }, 2000);
  // }

  // 刷新
  doRefresh(refresher) {
    this.itemx = [];
    setTimeout(() => {
      this.data.page = 1;
      this.getList(this.data);
      refresher.complete();
    }, 2000);
  }

  //点击日期获取列表
  getTeacherList(times) {
    let year = times.year;
    let month = times.time.slice(0, 2);
    let day = times.time.slice(3);
    let time = year + "/" + month + "/" + day;
    this.data.timeYd = new Date(Date.parse(time) / 1000).getTime();
    this.data.page = 1;
    // this.getList(this.data);
    // let loading = this.LoadCtrl.create({
    // });
    // loading.present();
    // setTimeout(() => {
    //   this.getList(this.data);
    //   setTimeout(()=>{
    //     loading.dismiss();
    //   })
    // }, 300);
    this.loading = this.LoadCtrl.create({
    });
    this.loading.present();
    setTimeout(() => {
      this.getList(this.data);

    });
  }

  onViewWillEnter() {
    this.slider.startAutoplay();
  }

  ionViewWillLeave() {
    this.slider.stopAutoplay();
  }

  ngOnInit() {//页面加载完成后自己调用
    setInterval(() => {
      this.slider.slideNext(300, true);
    }, 2000);
  }


  getTimeDay() {
    let D = new Date();
    let curYear = D.getFullYear();
    let curMonth = D.getMonth() + 1;
    let curDay = D.getDate();
    this.lastMidYear = curYear;
    this.lastMidMonth = curMonth;
    this.lastMidDay = curDay;
    this.week = [];
    this.getLasttestDay(curYear, curMonth, curDay);
  }

  /**
   * 周
   * @param firstday
   * @returns {any}
   */
  getWeekNum(firstday) {
    if (firstday == 0) {
      this.weekth = "日";
    } else if (firstday == 1) {
      this.weekth = "一";
    } else if (firstday == 2) {
      this.weekth = "二";
    } else if (firstday == 3) {
      this.weekth = "三";
    } else if (firstday == 4) {
      this.weekth = "四";
    } else if (firstday == 5) {
      this.weekth = "五";
    } else if (firstday == 6) {
      this.weekth = "六";
    }
    return this.weekth;
  }

  getLasttestDay(year, month, day) {
    let theDay = new Date(year, month - 1, day);
    this.firstday = theDay.getDay();
    let yearname = theDay.getFullYear();
    let monthname: any = theDay.getMonth() + 1;
    let dayname: any = theDay.getDate();
    let daynamestr = dayname;
    let week = this.getWeekNum(this.firstday);
    let monthnamestr = monthname;
    if (monthname < 10) {
      monthnamestr = "0" + monthname;
    }
    if (dayname < 10) {
      daynamestr = "0" + dayname;
    }
    let h = monthnamestr + "." + daynamestr;

    this.week.push({"id": "0", "time": h, "week": week, 'year': yearname});

    let todyDa = yearname + "." + monthname + "." + dayname + "-";
    this.lianTime = this.lianTime + todyDa;

    for (this.i = 1; this.i <= 6; this.i++) {
      let tomorrow = this.getTomorrow(theDay, this.i);
      let strYear = tomorrow.getFullYear();
      let strDay: any = tomorrow.getDate();
      let strMonth: any = tomorrow.getMonth() + 1;
      if (strMonth < 10) {
        strMonth = "0" + strMonth;
      }
      if (strDay < 10) {
        strDay = "0" + strDay;//若果小于10，则在数字前面加0 eg.09
      }
      let tomday = tomorrow.getDay();
      let tomweekth = this.getWeekNum(tomday);//判断星期几
      let hL = strMonth + "." + strDay;
      this.week.push({"id": this.i, "time": hL, "week": tomweekth, 'year': strYear});
    }
  }

  getTomorrow(date, n) {
    let tomorrow_milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * n;
    let tomorrow = new Date();
    tomorrow.setTime(tomorrow_milliseconds);
    return tomorrow;
  }

  /**
   *左划右划
   * @param event
   * @param week
   */
  swipeEvent(event, week) {
    //向左滑

    let n = this.infoArray.length - 1;
    if (event.direction == 2) {
      if (this.infoArray.indexOf(this.info) < n) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) + 1];
        this.getTeacherList(week[this.infoArray.indexOf(this.info)])
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArray.indexOf(this.info) > 0) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) - 1];
        this.getTeacherList(week[this.infoArray.indexOf(this.info)])
      }
    }
  }

  /**
   * 定位
   * @param item
   */
  grade(item) {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        wx.openLocation({
          latitude: Number(item.lat), // 纬度，浮点数，范围为90 ~ -90
          longitude: Number(item.lng), // 经度，浮点数，范围为180 ~ -180。
          name: item.city + item.province, // 位置名
          address: item.address, // 地址详情说明
          scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      },
      cancel: function (res) {
        alert('错误');
      }
    });
  }


}


