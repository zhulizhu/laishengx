


import {IonicPage} from "ionic-angular";
import {Component} from "@angular/core";

@IonicPage({
  name: 'tabsPage',
  segment: 'tabsPage'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // @ViewChild('mainTabs') tabs: Tabs;

  tab1Root='HelpPage';
  tab2Root='TeamPage';
  tab3Root='CoachPage';
  tab4Root= 'PartnerPage';
  tab5Root= 'MyPage';
  id;
  constructor() {

  }


}
