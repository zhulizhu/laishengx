import {Injectable} from "@angular/core";
import {isArray} from "rxjs/util/isArray";
import {CommonService} from "./CommonService";
@Injectable()
export class CommonJs {
  constructor(private commonService: CommonService) {

  }
  /**
   * 清除字符串里面的标签
   * @param text
   * @returns {any}
   */
  public contentText(text) {
    text = text.replace(/(&lt;.*?.&gt;)|<.*?>|(&nbsp;)/g, '');
    return text;
  }
  /**
   *
   * @param text
   */
  public conArray(text) {
    let textArray = [];
    let a = this.commonService.isEmptyObject(text);
    if (a) {
      if (text) {
        // let regex=new RegExp('、', 'g');
        let regex = new RegExp(/\d、/, 'g');
        let length = text.match(regex);
        if (isArray(length)) {
          for (let i = 0; i <= length.length; i++) {
            if (i == length.length) {
              textArray.push(text.slice(text.indexOf(i + '、')));
            } else {
              textArray.push(text.slice(text.indexOf((i) + '、'), text.indexOf((i + 1) + '、')));
            }
          }
          for (let j = 0; j <= textArray.length; j++) {
            for (let i = 0; i < textArray.length; i++) {
              if (!textArray[i]) {
                textArray.splice(i, 1);
              }
            }
          }
        } else {
          textArray.push(text);
        }
        return textArray;
      }
    } else {
      return [];
    }

  }

  /**
   * 转义
   */
  public conZhuan(text) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return text.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    // text.replace(/(&lt;.*?.&gt;)|<.*?>|(&nbsp;)/g, '')
  }

  /**
   * 清楚数组重定向
   */

  public cancelArray(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
          j--;
        }
      }
    }
    return array;
  }

  /**
   * 获取某月的最后一天
   */
  public getMonthLast(time){
    // console.log(time);
    let date;
    if(Number(time)){
      date=new Date(time*1000);
    }else {
      let a = Date.parse(time);
      date = new Date(a);
    }

    let month=date.getMonth();
    let nextMonth=++month;
    let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1).getTime();
    let oneDay=1000;
    return (Number(nextMonthFirstDay)-Number(oneDay))/1000;
  }
}
