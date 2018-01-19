import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavParams} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";
import {CommonJs} from "../../providers/CommonJs";
declare var $:any ;
@Component({
  templateUrl: 'protocol.html',
  selector:'protocol'
})

@IonicPage({
  name: 'ProtocolPage',
  segment: 'ProtocolPage/:type'
})

export class ProtocolPage {

  content = '';


  constructor(private commonService: CommonService,
              private navParams:NavParams,
              private comJs:CommonJs,
              private loadCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.protocolContent();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    });

  }


  /**
   * 协议
   */
  protocolContent() {//1:合伙人 2:购买套餐协议 3:充值协议
    let type=this.navParams.get('type');
    let param;
    if(type==1){
      param = {
        r: 'wx_api.user.globonus'
      };
    } else if(type==2){
      param = {
        r: 'wx_api.getProtocol',
        name:'pay_protocol'
      };
    }
    else if(type==3){
      param = {
        r: 'wx_api.getProtocol',
        name:'buycard_protocol'
      };
    }


    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        $("#protocol").html(this.comJs.conZhuan(res.result.content));
        $("#title").html(this.comJs.conZhuan(res.result.title));
        $("#protocol").find('img').css({'max-width':'90%','height':'auto','display':'block','margin':'0 auto'})
      } else {
        alert(res.result.message);
      }
    })
  }
}
