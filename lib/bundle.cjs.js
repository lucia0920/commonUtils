'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 时间处理函数
 */
const formatTime = {
  /**
   * 
   */
  formatMediaTime: (duration) => {
    let min = Math.floor(duration / 60);
    let second = duration - min * 60;
    min = min >= 10 ? min : '0' + min;
    second = second >= 10 ? second : '0' + second;
    return min + ':' + second
  },

  timeTohhmmss: (seconds) => {
    let hh, mm, ss;

    if (seconds === null || seconds < 0) return

    let pseconds = parseInt(seconds);

    //得到小时
    hh = pseconds / 3600 | 0;

    pseconds = parseInt(pseconds) - parseInt(hh) * 3600;

    if (parseInt(hh) < 10) {
      hh = "0" + hh;
    }

    if (parseInt(hh) >= 24) {
      hh = "00";
    }

    //得到分钟
    mm = parseInt(pseconds) / 60 | 0;

    //得到秒
    ss = parseInt(pseconds) - parseInt(mm) * 60;

    if (parseInt(mm) < 10) {
      mm = "0" + mm;
    }

    if (parseInt(ss) < 10) {
      ss = "0" + ss;
    }

    return hh + ":" + mm + ":" + ss
  },

  /**
   * 获取当天标准时间格式
   * eg：getTodayDate() //'2021年11月4日 星期四'
   */

  getTodayDate: () => {
    let now = new Date();
    let yy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    let day = new Array();
    day[0] = "星期日";
    day[1] = "星期一";
    day[2] = "星期二";
    day[3] = "星期三";
    day[4] = "星期四";
    day[5] = "星期五";
    day[6] = "星期六";
    return (yy + '年' + mm + '月' + dd + '日 ' + day[now.getDay()])
  },

  /**
   * 判断当前时间与输入时间间隔
   * eg:timestampFormat(new Date()) //'刚刚'
   */
  timestampFormat: (timestamp) => {
    function zeroize(num) {
      return (String(num).length == 1 ? '0' : '') + num;
    }

    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(); tmDate.getSeconds();

    if (timestampDiff < 60) { // 一分钟以内
      return "刚刚";
    } else if (timestampDiff < 3600) { // 一小时前之内
      return Math.floor(timestampDiff / 60) + "分钟前";
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
      return '今天 ' + zeroize(H) + ':' + zeroize(i);
    } else {
      var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
      if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
        return '昨天 ' + zeroize(H) + ':' + zeroize(i);
      } else {
        return Y + '/' + zeroize(m) + '/' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
      }
    }
  },

  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
   * let sjc = 1488481383;//时间戳
   * console.log(time.formatTime(sjc,'Y/M/D h:m:s'));//转换为日期：2017/03/03 03:03:03
   * console.log(time.formatTime(sjc, 'h:m'));//转换为日期：03:03
   */
  getformatData: (val, fmt) => {
    var o = {
      "M+": val.getMonth() + 1,                 //月份
      "d+": val.getDate(),                    //日
      "h+": val.getHours(),                   //小时
      "m+": val.getMinutes(),                 //分
      "s+": val.getSeconds(),                 //秒
      "q+": Math.floor((val.getMonth() + 3) / 3), //季度
      "S": val.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (val.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
   * let sjc = 1488481383;//时间戳
   * console.log(time.formatTime(sjc,'Y/M/D h:m:s'));//转换为日期：2017/03/03 03:03:03
   * console.log(time.formatTime(sjc, 'h:m'));//转换为日期：03:03
   */
  formatTimeAllType: (number, format) => {
    function formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n
    }

    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    let date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },
  /**
   * 获取昨天时间
   * eg: getYesterDay()     // 2021-11-3'
   */
  getYesterDay: () => {
    //昨天的时间
    let day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    let s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();// + " " + day1.getHours() + ':' + day1.getMinutes() + ':'+day1.getSeconds();
    return s1
  },

  /**
   * 获取当月的第一天
   */
  getCurrentMonthFirst: () => {
    var date = new Date();
    date.setDate(1);
    let s2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return s2;
  },

  /**
   * 计算本周或者本月过完几天，或者还剩几天
   * @param tNum :月/30,周/7
   * @param type :1:过完百分之几,不填或是其他都是表示本周/本月剩余多少天
   */

  getTodayDateNum: (tNum, type) => {
    let now = new Date();
    let yy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    let xx = now.getDay();
    let day = new Array();
    let num = 0;
    day[0] = "星期日";
    day[1] = "星期一";
    day[2] = "星期二";
    day[3] = "星期三";
    day[4] = "星期四";
    day[5] = "星期五";
    day[6] = "星期六";
    xx = xx == 0 ? 7 : xx;
    if (tNum == 30) {
      tNum = new Date(yy, mm, 0).getDate();
    }
    if (type) {
      num = (tNum == 7 ? xx / tNum : dd / tNum) * 100;
      num = num.toFixed(2);
    } else {
      num = (tNum - (tNum == 7 ? xx : dd));
    }
    return num
  },

  /**
   * 获取几天后的日期
   * @param AddDayCount 天数
   */
  GetDateStr: (AddDayCount) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth();//获取当前月份的日期
    var d = dd.getDate();
    return new Date(y, m, d, 0, 0, 0);
  },

  // //是否满5年
  // satisfy5Year: (time) => {
  //   if (!time) {
  //     return false
  //   }
  //   let dd = new Date();
  //   dd.setDate(dd.getDate() - 365 * 5);//获取AddDayCount天后的日期
  //   let y = dd.getFullYear();
  //   let m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
  //   let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
  //   let time1 = y + "-" + m + "-" + d;

  //   return time1 > time ? true : false;
  // },
  //计算两个时间是否大于等于30天
  satisfy30Day: (first, second) => {
    var data1 = Date.parse(first.replace(/-/g, "/"));
    var data2 = Date.parse(second.replace(/-/g, "/"));
    var datadiff = data2 - data1;
    var days = datadiff / (1 * 24 * 60 * 60 * 1000);

    if (first.length > 0 && second.length > 0) {
      if (datadiff < 0 || days >= 29) {
        return true;
      } else {
        return false;
      }
    }
  },
  // 判断两个时间内间隔几年几月几个小时
  getDiffYmdBetweenDate1: (sDate1, sDate2) => {
    var fixDate = function (sDate) {
      var aD = sDate.split('-');
      for (var i = 0; i < aD.length; i++) {
        aD[i] = fixZero(parseInt(aD[i]));
      }
      return aD.join('-');
    };

    var fixZero = function (n) {
      return n < 10 ? '0' + n : n;
    };

    var fixInt = function (a) {
      for (var i = 0; i < a.length; i++) {
        a[i] = parseInt(a[i]);
      }
      return a;
    };

    var getMonthDays = function (y, m) {
      var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)) {
        aMonthDays[2] = 29;
      }
      return aMonthDays[m];
    };

    var y = 0;
    var m = 0;
    var d = 0;
    var sTmp;
    var aTmp;
    sDate1 = fixDate(sDate1);
    sDate2 = fixDate(sDate2);
    if (sDate1 > sDate2) {
      return
    }
    var aDate1 = sDate1.split('-');
    aDate1 = fixInt(aDate1);
    var aDate2 = sDate2.split('-');
    aDate2 = fixInt(aDate2);
    //计算相差的年份
    y = aDate2[0] - aDate1[0];
    if (sDate2.replace(aDate2[0], '') < sDate1.replace(aDate1[0], '')) {
      y = y - 1;
    }
    //计算月份
    aTmp = [aDate1[0] + y, aDate1[1], fixZero(aDate1[2])];
    while (true) {
      if (aTmp[1] == 12) {
        aTmp[0]++;
        aTmp[1] = 1;
      } else {
        aTmp[1]++;
      }
      if (([aTmp[0], fixZero(aTmp[1]), aTmp[2]]).join('-') <= sDate2) {
        m++;
      } else {
        break;
      }
    }
    //计算天数
    aTmp = [aDate1[0] + y, aDate1[1] + m, aDate1[2]];
    if (aTmp[1] > 12) {
      aTmp[0]++;
      aTmp[1] -= 12;
    }
    while (true) {
      if (aTmp[2] == getMonthDays(aTmp[0], aTmp[1])) {
        aTmp[1]++;
        aTmp[2] = 1;
      } else {
        aTmp[2]++;
      }
      sTmp = ([aTmp[0], fixZero(aTmp[1]), fixZero(aTmp[2])]).join('-');
      if (sTmp <= sDate2) {
        d++;
      } else {
        break;
      }
    }
    return { yearMount: y, monthMount: m, dayMount: d }
  },

  /**
   * 获取间隔时间
   */
  getDiffYmdBetweenDate: (startTime, endTime) => {
    let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
    let start = new Date(startTime);
    let end = new Date(endTime);
    let year = end.getFullYear() - start.getFullYear();
    let month = end.getMonth() - start.getMonth();
    let day = end.getDate() - start.getDate();
    if (month < 0) {
      year--;
      month = end.getMonth() + (12 - start.getMonth());
    }
    if (day < 0) {
      if (day != -1) {
        month--;
        let index = flag.findIndex((temp) => {
          return temp === start.getMonth() + 1
        });
        let monthLength;
        if (index <= 6) {
          monthLength = 31;
        } else if (index > 6 && index <= 10) {
          monthLength = 30;
        } else {
          if ((end.getFullYear() % 400 == 0) || (end.getFullYear() % 4 == 0 && end.getFullYear() % 100 != 0)) {
            monthLength = 29;
          } else {
            monthLength = 28;
          }
        }
        day = end.getDate() + (monthLength - start.getDate());
      } else {
        day = 0;
      }
    }
    // result = `相差${year}年${month}月${day}天`;
    return { yearMount: year, monthMount: month, dayMount: day }
  }
};

var version = require("../package.json").version;

exports.formatTime = formatTime;
exports.version = version;
