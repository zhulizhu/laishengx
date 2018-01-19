import { Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'CourseTablePage',
  segment:'CourseTablePage/:openid'
})
@Component({
  selector: 'page-coursetable',
  templateUrl: 'coursetable.html'
})

export class CourseTablePage {
  infoArray = ["base_0", "base_1", "base_2", "base_3", "base_4", "base_5", "base_6", "base_7"];
  info = this.infoArray[0];
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
  list = [];
  itemx = [];
  lists:any;
  date = new Date().toISOString();
  day=this.date.slice(0,10);
  todayTime=this.day;
  dataTime;
  data={
    page:1,
    timeYd :new Date(Date.parse(this.todayTime)/1000).getTime(),//切换的年月日
    type:"1"
  };




  constructor(private commonService:CommonService,
              private LoadCtrl:LoadingController,
              private navCtrl:NavController,
              private navParams:NavParams) {
    this.getTimeDay();
    let loading = this.LoadCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      this.getList(this.data);
      setTimeout(()=>{
        loading.dismiss();
      })
    }, 300);
  }

  /**
   * 私教列表
   * @param data
   */
  getList(data) {
    let openid=this.navParams.get('openid');
    this.list=[];
    if (data.page == 1) {
      this.itemx = [];
    }
    this.data.page = data.page;
    this.param = {
      r: "wx_api.goods.get_list_by_coach",
      openid:openid
    };
    this.commonService.getResult(this.param).then(res => {
      if(res.status==1){
        this.lists= res.result.list;
        for(let i=0;i<this.lists.length;i++){
          this.dataTime =this.turnDate(new Date(this.lists[i].course_starttime*1000).toISOString());
          if(this.dataTime== Number(this.data.timeYd)){
            this.list.push(this.lists[i]);
            this.list=this.undulpicate(this.list);
          }
        }
        this.itemx = this.itemx.concat(this.list);
      }else{
        this.lists=[];
      }
    });
  };

  /**
   * 预约
   */
  OrderClass(id, time, Endtime,address,person,reminder,course_type) {
    let week=this.commonService.getWeekNum(time);

    if(course_type=='1'){
      this.navCtrl.push('CoachorderclassPage', {id: id, timeYd: time, Endtime,storeaddress:address,person:person,reminder:reminder})
    }else if(course_type=='3'){
      this.navCtrl.push('HelpdetailPage', {id: id, week: week})
    }else if(course_type=='2'){
      this.navCtrl.push('TeamdetailPage', {id: id, week: week})
    }

  }
  /**
   * 点击日期获取列表
   * @param times
   */
  getTeacherList(times){
    let year=times.year;
    let month=times.time.slice(0,2);
    let day=times.time.slice(3);
    let time=year+"-"+month+"-"+day;
    let getTimes = time.slice(0, 10);

    this.data.timeYd = new Date(Date.parse(getTimes)/1000).getTime();
    this.data.page=1;
    this.getList(this.data);
  }

  /**
   * 删除刷新重复数据
   * @param array
   * @returns {any}
   */
  undulpicate(array){
    for(var i=0;i<array.length;i++) {
      for(var j=i+1;j<array.length;j++) {
        if(array[i].id===array[j].id) {
          array.splice(j,1);
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
   * 加载更多
   * @param Infinite
   */
  doInfiniteMember(Infinite) {
    setTimeout(() => {
      this.data.page += 1;
      this.getList(this.data);
      Infinite.complete();
    }, 2000);
  }
  /**
   * 刷新
   * @param refresher
   */
  doRefresh(refresher) {
    this.itemx = [];
    setTimeout(() => {
      this.data.page=1;
      this.getList(this.data);
      refresher.complete();
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
    let h = monthnamestr + "月" + daynamestr+"日";
    this.week.push({"id": "0", "time": h, "week": week,"year":yearname});

    let todyDa = yearname + "." + monthname + "." + dayname + "-";
    this.lianTime = this.lianTime + todyDa;

    for (this.i = 1; this.i <= 6; this.i++) {
      let tomorrow = this.getTomorrow(theDay, this.i);
      // let strYear = tomorrow.getFullYear();
      let strYear:any=tomorrow.getFullYear();
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
      let hL = strMonth + "月" + strDay+"日";
      this.week.push({"id": this.i, "time": hL, "week": tomweekth,'year':strYear});
    }
  }


  getTomorrow(date, n) {
    let tomorrow_milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * n;
    let tomorrow = new Date();
    tomorrow.setTime(tomorrow_milliseconds);
    return tomorrow;
  }





}
