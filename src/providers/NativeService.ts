import {Injectable} from '@angular/core';
import {ToastController, LoadingController, AlertController, Platform} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {FileTransfer} from "@ionic-native/file-transfer";
import {APP_DOWNLOAD} from "./Common";
import {AppVersion} from "@ionic-native/app-version";
import {FileOpener} from "@ionic-native/file-opener";
import {File} from "@ionic-native/file";

@Injectable()
export class NativeService {
    private toast;
    private loading;

    constructor(private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public inAppBrowser: InAppBrowser,
                private transfer: FileTransfer,
                private platform: Platform,
                private fileOpen: FileOpener,
                private file: File,
                private appVersion: AppVersion) {
    }

    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    showToast = (message: string = '操作完成', duration: number = 2500) => {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top',
            showCloseButton: true,
            closeButtonText: '关闭'
        });
        this.toast.present();
    };

    /**
     * 关闭信息提示框
     */
    hideToast = () => {
        this.toast.dismissAll()
    };

    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    showLoading = (content: string = '') => {
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
        setTimeout(() => {//最长显示20秒
            this.loading.dismiss();
        }, 20000);
    };

    /**
     * 关闭loading
     */
    hideLoading = () => {
        this.loading.dismissAll()
    };

    /**
     * 使用cordova-plugin-camera获取照片的base64
     * @param options
     * @return {Promise<T>}
     */
    getPicture = (options) => {
        return new Promise((resolve, reject) => {
            Camera.getPicture(Object.assign({
                sourceType: Camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
                destinationType: Camera.DestinationType.DATA_URL,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
                quality: 90,//保存的图像质量，范围为0 - 100
                allowEdit: true,//选择图片前是否允许编辑
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,//缩放图像的宽度（像素）
                targetHeight: 800,//缩放图像的高度（像素）
                saveToPhotoAlbum: false,//是否保存到相册
                correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
            }, options)).then((imageData) => {
                resolve(imageData);
            }, (err) => {
                console.log(err);
                err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
            });
        });
    };

    /**
     * 通过图库获取照片
     * @param options
     * @return {Promise<T>}
     */
    getPictureByPhotoLibrary = (options = {}) => {
        return new Promise((resolve) => {
            this.getPicture(Object.assign({
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }, options)).then(imageBase64 => {
                resolve(imageBase64);
            }).catch(err => {
                String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
            });
        });
    };

    /**
     * 通过拍照获取照片
     * @param options
     * @return {Promise<T>}
     */
    getPictureByCamera = (options = {}) => {
        return new Promise((resolve) => {
            this.getPicture(Object.assign({
                sourceType: Camera.PictureSourceType.CAMERA
            }, options)).then(imageBase64 => {
                resolve(imageBase64);
            }).catch(err => {
                String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
            });
        });
    };

    /**
     * 检查app是否需要升级
     */
    detectionUpgrade(url) {
        //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
        //版本号不一样就需要申请,不需要升级就return
        this.alertCtrl.create({
            title: '升级',
            subTitle: '发现新版本,是否立即升级？',
            buttons: [
                {
                    text: '取消',
                },
                {
                    text: '确定',
                    handler: () => {
                        this.downloadApp(url);
                    }
                }
            ],
            cssClass: 'cssalert',
        }).present();
    }

    /**
     * 下载安装app
     */
    downloadApp(url) {
        if (this.isAndroid()) {
            let alert = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
                buttons: ['取消下载'],
                cssClass: 'cssalert',
            });
            alert.present();

            let fileTransfer = this.transfer.create();

            let apk = this.file.externalDataDirectory + 'shengyile.apk'; //apk保存的目录

            // let apk = "file:///storage/sdcard0/Download/shengyile.apk";
            fileTransfer.download(url, apk).then(() => {
                this.fileOpen.open(apk, 'application/vnd.android.package-archive').then(() => {
                });
                // window['install'].install(apk.replace('file://', ''));
            });
            fileTransfer.onProgress((event: ProgressEvent) => {
                let num = Math.floor(event.loaded / event.total * 100);
                if (num === 100) {
                    alert.dismiss();
                } else {
                    let title = document.getElementsByClassName('alert-title')[0];
                    title && (title.innerHTML = '下载进度：' + num + '%');
                }
            });
        }
        if (this.isIos()) {
            this.openUrlByBrowser(APP_DOWNLOAD);
        }
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        this.inAppBrowser.create(url, '_system');
    }

    /**
     * 是否真机环境
     * @return {boolean}
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     * @return {boolean}
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }


    getVersionNumber(): Promise<string> {
        return new Promise((resolve) => {
            this.appVersion.getVersionNumber().then((value: string) => {
                resolve(value);
            }).catch(err => {
                console.log('getVersionNumber:' + err);
            });
        });
    }

    getAppName(): Promise<string> {
        return new Promise((resolve) => {
            this.appVersion.getAppName().then((value: string) => {
                resolve(value);
            }).catch(err => {
                console.log('getAppName:' + err);
            });
        });
    }
}