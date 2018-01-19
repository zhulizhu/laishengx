import {Injectable} from "@angular/core";
import {App, NavController, Platform} from "ionic-angular";
@Injectable()

export class BackButton{

  backButton:boolean=false;

  constructor(public platform:Platform,
              public app:App){
  }


  public a(){
    let i=0;
    this.platform.registerBackButtonAction(res=>{
      console.log(res);
      let activeNav:NavController=this.app.getActiveNav();
      if(activeNav.canGoBack()){
        i=1;
      }else {
        i=2;
      }
    });
    return i;
  }

}
