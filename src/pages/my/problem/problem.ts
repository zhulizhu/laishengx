import {Component} from "@angular/core";
import {IonicPage, LoadingController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {CommonJs} from "../../../providers/CommonJs";
@Component({
  selector: 'problem',
  templateUrl: 'problem.html'
})

@IonicPage({
  name: 'ProblemPage',
  segment: 'ProblemPage'
})

export class ProblemPage {

  items=[];
  className=0;

  constructor(private commonService:CommonService,
              private comJs:CommonJs,
              private loadCtrl:LoadingController) {

  }


  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.problemList();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }



  /**
   * 问题列表
   */
  problemList() {
    let param = {
      r: 'wx_api.user.help'
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        for(let i=0;i<res.result.list.length;i++){
          res.result.list[i].content=this.comJs.contentText(res.result.list[i].content)
        }
        this.items=res.result.list;
      } else {
        alert(res.result.message)
      }
    })
  }

  show(i){
    this.className=i;
  }

}
