import {Component} from "@angular/core";
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";

@IonicPage({
  name: 'AchievePage',
  segment: 'AchievePage'
})
@Component({
  selector: 'page-achieve',
  templateUrl: 'achieve.html'
})

export class AchievePage {
  lists;
  listsOne = [];
  listsTwo = [];
  listsThree = [];
  num = 0;
  yes = 0;
  loading;
  constructor(private commonService: CommonService, private LoadCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    this.loading = this.LoadCtrl.create({});
    this.loading.present();
    setTimeout(() => {
      this.achieveList();
    });
  }

  achieveList() {
    let param = {
      r: 'wx_api.user.rank'
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500);
        this.lists = res.result.list;
        this.descending(this.lists);
        if(this.lists.length>10&&this.lists.length<20){
          this.num=this.lists.length-3;
        }else if(this.lists.length>=20){
          this.num=this.lists.length-5;
        }
        if (this.lists.length > 10) {
          for (let i = 0; i < this.lists.length; i++) {
            if (i >= 0 && i < 3) {
              this.listsOne.push(this.lists[i]);
            } else if (i > this.num-1 && this.lists.length > 10) {
              this.listsThree.push(this.lists[i]);
            } else if (i < this.num && this.lists.length > 3) {
              this.listsTwo.push(this.lists[i]);
            }
          }
          if (this.listsThree.length == 0) {
            this.yes = 1;
          }
        } else {
          for (let i = 0; i < this.lists.length; i++) {
            if (i >= 0 && i < 3) {
              this.listsOne.push(this.lists[i]);
            } else{
              this.yes = 1;
              this.listsTwo.push(this.lists[i]);
            }
          }
        }
      } else {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500);
        alert(res.message);
      }
    })
  }

  /**
   * 加载更多
   */

  more() {
    this.yes = 1;
  }

  /**
   * 降序排列
   * @param arr
   * @returns {any}
   */
  descending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (Number(arr[j].all_time) < Number(arr[j + 1].all_time)) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
}
