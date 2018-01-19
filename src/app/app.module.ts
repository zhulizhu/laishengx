import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {HttpService} from "../providers/HttpService";
import {StorageService} from "../providers/StorageService";
import {CommonService} from "../providers/CommonService";
import { HttpModule }from '@angular/http';
import {IonicStorageModule} from "@ionic/storage";
import {CommonJs} from "../providers/CommonJs";
import {HelpdetailModule} from "../pages/help/helpdetail/helpdetail.module";
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HelpdetailModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    StorageService,
    CommonService,
    CommonJs,
  ]
})
export class AppModule {}
