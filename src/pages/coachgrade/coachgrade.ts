import {Component} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";

@IonicPage({
  name: 'CoachGradePage',
  defaultHistory: ['tabsPage'],
  segment:'CoachGradePage'
})

@Component({
  selector: 'page-coachgrade',
  templateUrl: 'coachgrade.html'
})
export class CoachGradePage {


  constructor(public navCtrl: NavController) {

  }

  GradeDetail() {
    this.navCtrl.push('GradeDetailPage')
  }
}

