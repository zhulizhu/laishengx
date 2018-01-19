import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
declare var $:any;

@IonicPage({
  name:'CardPage',
  segment:'CardPage'
})
@Component({
  selector: 'page-card',
  templateUrl: 'card.html'
})

export class CardPage {
  constructor(private navCtrl:NavController) {
    this.ionViewDidEnter();
  }

  ionViewDidEnter() {
    let range = $("#range"), circle1 = $(".circle1"),circle2 = $(".circle2");
    if (range && circle1&& circle2) {
        //percent1 =  $(".circle1")的百分比/ 100,percent2 = ($(".circle1")的百分比*$(".circle2")的百分比) / 10000
        let percent1 = 70 / 100, perimeter = Math.PI * 2 * 70,percent2 = (40*70) / 10000;
        circle1.attr('stroke-dasharray', perimeter * percent1 + " " + perimeter * (1 - percent1));
        circle2.attr('stroke-dasharray', perimeter * percent2 + " " + perimeter * (1 - percent2));
    }
  }

  /**
   * 用户排名
   */
  achieve(){
    this.navCtrl.push('AchievePage');
  }

  problem(){
    this.navCtrl.push('ProblemPage')
  }
  renew(){
    this.navCtrl.push('RechargePage');
  }
}
