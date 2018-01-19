/**
 * Created by 聚米粒 on 2017/6/22.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ToastController} from "ionic-angular";
@Injectable()
export class CommonToast {
    constructor(private toastCtrl:ToastController) {}

    public myToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 1000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: '关闭'
        });
        toast.present();
    }
}