import {Component} from "@angular/core";
import {IonicPage, ViewController} from "ionic-angular";

@IonicPage({
  name:'ProjectModal',
  segment:'ProjectModal'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/ProjectModal.html'
})
export class ProjectModal {
  constructor(private viewCtrl:ViewController) {

  }

  sure(){
    this.viewCtrl.dismiss();
  }
}
