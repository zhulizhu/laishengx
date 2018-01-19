import {Component} from "@angular/core";
import {IonicPage, NavController, ViewController} from "ionic-angular";
import {CommonJs} from "../../../providers/CommonJs";
import {isNumber} from "ionic-angular/util/util";

@IonicPage({
  name: 'ChoosetimePage',
  segment: 'ChoosetimePage'
})
@Component({
  selector: 'page-choosetime',
  templateUrl: 'choosetime.html'
})

export class ChoosetimePage {
  // time=new Date().toISOString();
  // time1=new Date().toISOString();
  item = 1;//1:年月日   2:年月
  startTime;
  time = {
    starttime: '',
    endtime: 0,
    type: 1
  };

  constructor(public navCtrl: NavController,
              private comJs:CommonJs,
              private viewCtrl: ViewController) {

  }

  chooseTime(tip) {
    if (tip == 1) {
      this.item = 2;
    } else {
      this.item = 1;
    }

  }


  /**
   * 选择时间完成
   * @returns {boolean}
   */
  close() {

    if (this.item == 1) {
    } else {
      this.time.starttime = this.startTime;
      this.time.endtime = this.comJs.getMonthLast(this.time.starttime);
      this.time.type = 2;
    }
    let okTime = this.timeS(this.time);
    if (okTime) {
      this.viewCtrl.dismiss(JSON.stringify(okTime));
    }

  }


  /**
   * 返回的时间戳
   * @param item
   * @returns {any}
   */
  timeS(item) {
    let start;
    let end;
    if (item.starttime) {
      let a = Date.parse(item.starttime);
      start = new Date(a).getTime() / 1000
    }
    if(isNumber(item.endtime)){
      end=item.endtime;
    }else if (item.endtime) {
      let b = new Date(Date.parse(item.endtime));
      let year=b.getFullYear();
      let month=b.getMonth();
      let day=b.getDate();
      end = new Date(year,month,day,23,59,59).getTime() / 1000;
    }

    item = {
      starttime: start,
      endtime: end,
      type: item.type
    };

    if (item.type == 2) {
      if (!item.starttime) {
        alert('请选择日期');
        return false;
      }
    } else if (item.type == 1) {
      if(!item.starttime && !item.endtime){
        alert('请选择日期');
        return false;
      }else if (!item.starttime && item.endtime) {
        alert('请选择开始日期');
        return false;
      } else if (item.starttime && !item.endtime) {
        alert('请选择结束日期');
        return false;
      } else if (item.starttime && item.endtime) {
        if (item.starttime > item.endtime) {
          alert('开始时间大于结束时间');
          return false;
        }
      }

    }


    return item;
  }


  /**
   * 取消选择
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

}

