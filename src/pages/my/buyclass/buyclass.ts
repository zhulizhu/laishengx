import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {Storage} from "@ionic/storage";

@IonicPage({
  name: 'BuyclassPage',
  segment: 'BuyclassPage'
})
@Component({
  selector: 'page-buyclass',
  templateUrl: 'buyclass.html',
  providers: [CommonService]
})

export class BuyclassPage {
  Contract: number = 0;
  param;
  items=[];
  packageLen:number;
  privateLen:number;

  constructor(private loadCtrl: LoadingController,
              private navCtrl:NavController,
              private storage:Storage,
              private commonService: CommonService,) {
  }

  ionViewDidEnter() {
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.buyclass();
      setTimeout(() => {
        loading.dismiss();
      }, 500);
    }, 300);

  }

  //购买套餐
  buyclass() {
    this.param = {
      r: 'wx_api.user.package',
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        let packageItems = res.result.package;
        let privateItems = res.result.private;
        this.packageLen=res.result.package.length;
        this.privateLen=res.result.private.length;

        this.items = packageItems.concat(privateItems);
      } else {
        this.items = [];
      }

    })
  }

  payClass(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item == this.items[i].id) {
        this.storage.set('param',{'id':this.items[i].id, 'price': this.items[i].price, 'name': this.items[i].name, 'value': this.items[i].value});
        // this.app.getRootNav().setRoot('SureOrderClassPage')
        this.navCtrl.push('SureOrderClassPage')
      }
    }
  }

  // contract(){
  //   if(this.Contract==2){
  //     let myModal=this.myModal.create('ContractModal');
  //     myModal.present();
  //   }
  // }

}
