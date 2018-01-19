import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {TabsPage} from "../../tabs/tabs";

@IonicPage({
  name:'CommentPage',
  // segment:'CommentPage/:orderid/:goodsid'
  segment:'CommentPage'
})
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  goodsYes='assets/img/goods-yes.png';
  goodsNo='assets/img/goods-no.png';
  badYes='assets/img/bad-yes.png';
  badNo='assets/img/bad-no.png';
  server_star_only;
  course_star_only;
  ambient_star_only;
  start={
    server:5,
    course:5,
    ambient:5,
  };
  cover=0;//1:匿名
  content;
  server_star = [
    {"id": '0', 'className': ''},
    {"id": '1', 'className': ''},
    {"id": '2', 'className': ''},
    {"id": '3', 'className': ''},
    {"id": '4', 'className': ''},
  ];
  course_star = [
    {"id": '0', 'className': ''},
    {"id": '1', 'className': ''},
    {"id": '2', 'className': ''},
    {"id": '3', 'className': ''},
    {"id": '4', 'className': ''},
  ];
  ambient_star = [
    {"id": '0', 'className': ''},
    {"id": '1', 'className': ''},
    {"id": '2', 'className': ''},
    {"id": '3', 'className': ''},
    {"id": '4', 'className': ''},
  ];

  constructor(private commonService:CommonService,
              private navCtrl:NavController,
              private navParams:NavParams) {
  }

  /**
   *@param type
   * @param type
   */
  thumbs(type,thumb){
    if(thumb=='bad'){
      this.goodsNo='assets/img/goods-yes.png';
      this.goodsYes='assets/img/goods-no.png';
      this.badNo='assets/img/bad-yes.png';
      this.badYes='assets/img/bad-no.png';
    }
    if(thumb=='goods'){
      this.goodsYes='assets/img/goods-yes.png';
      this.goodsNo='assets/img/goods-no.png';
      this.badYes='assets/img/bad-yes.png';
      this.badNo='assets/img/bad-no.png';
    }
  }

  /**
   *
   * @param type
   * @param num
   */
  star(type, num) {
    if (type == 'server') {
      this.start.server=parseInt(num)+1;
        for (let i = num; i < 5; i++) {
          this.server_star_only = {"id": "" + i + "", 'className': "unhappy"};
          this.server_star[i] = this.server_star_only;
        }
        for (let i = 0; i <= num; i++) {
          this.server_star_only = {"id": "" + (i-1) + "", 'className': ""};
          this.server_star[i] = this.server_star_only;
        }

    }
    if (type == 'course') {
      this.start.course=parseInt(num)+1;
        for (let i = num; i < 5; i++) {
          this.course_star_only = {"id": "" + i + "", 'className': "unhappy"};
          this.course_star[i] = this.course_star_only;
        }
        for (let i = -1; i <= num; i++) {
          this.course_star_only = {"id": "" + (i-1) + "", 'className': ""};
          this.course_star[i] = this.course_star_only;
      }
    }
    if (type == 'ambient') {
      this.start.ambient=parseInt(num)+1;
        for (let i = num; i < 5; i++) {
          this.ambient_star_only = {"id": "" + i + "", 'className': "unhappy"};
          this.ambient_star[i] = this.ambient_star_only;
        }
        for (let i = -1; i <= num; i++) {
          this.ambient_star_only = {"id": "" + (i-1) + "", 'className': ""};
          this.ambient_star[i] = this.ambient_star_only;
      }
    }

  }

  /**
   * 提交评论
   */

  sub(){
    let goodsid=this.navParams.get('goodsid');
    let orderid=this.navParams.get('orderid');
    let param={
      r:'wx_api.order.comment.submit',
      orderid:orderid,
      content:this.content,
      goodsid:goodsid,
      image:'',
      level:this.start.server,
      level2:this.start.course,
      level3:this.start.course,
      display:this.cover?1:0
    };

    this.commonService.getResult(param).then(res=> {
      if (res.status == 1) {
        this.navCtrl.push(TabsPage)
      } else {
        alert(res.result.message);
        this.navCtrl.push('CoursePage');
      }
    });

  }
}
