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
  },
  /**
   * 几分钟倒计时
   * @param minute 分钟
   */
  resetTime: (minute) => {
    var timer = null;
    var second = 0;
    minute < 10 && (minute = '0' + minute);
    function countDown() {
      second--;
      second < 10 && (second = '0' + second);
      if (second.length >= 3) {
        second = 59;
        minute = "0" + (Number(minute) - 1);
      }
      if (minute == '00' && second == '00') {
        minute = '00';
        second = '00';
        clearInterval(timer);
      }
      console.log(minute + "分钟" + second + "秒");
    }
    timer = setInterval(countDown, 1000);
  }
};

const regExpr = {
  /**
   * 校验手机号
   * @param mobile
   * @returns {boolean}
   */
  checkMobile: mobile => {
    return /^[1][0-9]{10}$/.test(mobile)
  },

  /**
   * 校验固定电话
   * @param phone
   * @returns {boolean}
   */
  checkTelephone: phone => {
    return /^(0[0-9]{2,3}(\-)?)?([2-9][0-9]{6,7})+((\-)?[0-9]{1,4})?$/.test(phone)
  },

  /**
   * 校验邮箱
   * @param email
   * @returns {boolean}
   */
  checkEmail: email => {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/.test(email)
  },

  /**
   * 校验是否纯数字
   * @param num
   * @returns {boolean}
   */
  checkNum: num => {
    return /^[0-9]+$/.test(num)
  },

  /**
   * 校验用户名：1-20位字符，首字符为字母
   * @param str
   * @returns {RegExp}
   */
  checkUserName: str => {
    return /^[a-zA-Z]{1,20}$/.test(str)
  },

  /**
   * 校验密码：6-20位，数字、字母、下划线
   * @param str
   * @returns {boolean}
   */
  checkPwd: str => {
    return /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,18}$/.test(str)
  },

  /**
   * 校验正整数
   * @param num
   * @returns {boolean}
   */
  checkPositiveInteger: num => {
    return /^[0-9]*[1-9][0-9]*$/.test(num)
  },

  /**
   * 校验正整数 + 0
   * @param num
   * @returns {boolean}
   */
  checkZeroPositiveInteger: num => {
    return /^(0|\+?[1-9][0-9]*)$/.test(num)
  },

  /**
   * 11位纯数字 + 0
   * @param num
   * @returns {boolean}
   */
  checkInteger11: num => {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(num)
  },

  /**
   * 8-11位纯数字 + 0
   * @param num
   * @returns {boolean}
   */
  checkInteger8_11: num => {
    return /^(\d{8}|\d{11,})$/.test(num)
  },
  /**
   * 电话号码、固话、小灵通校验
   * @param num
   * @returns {boolean}
   */
  checkPhone: num => {
    return /(^1[3-9]\d{9}$)|(^(^0\d{2,3}(-)?)?\d{7,8}$)/.test(num)
  },
  /**
   * 8位纯数字 + 0
   * @param num
   * @returns {boolean}
   */
  checkInteger8: num => {
    return /^(\d{8})$/.test(num)
  },
  /**
   * 校验邮箱,eg:请输入***@**格式的邮箱地址
   * @param num
   * @returns {boolean}
   */
  checkEmall: num => {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(num)
  },

  /**
   * 11位纯数字 + 0
   * @param num
   * @returns {boolean}
   */
  checkIdentity: num => {
    return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(num)
  },

  /**
   * 权限过滤
   */
  appPowers: (condition, content) => {
    if (condition) {
      return content
    } else {
      return null
    }
  },
  /**
   * 银行卡号
   * @param bankNum
   * @returns {boolean}
   */
  bankNum: bankNum => {
    return /^([0-9]{1})(\d{0,29})$/.test(bankNum)
    // return /^([1-9]{1})(\d{14}|\d{18})$/.test(bankNum)
  },

  /**
   * 保留指定小数位数的正数
   * @param bankNum 位数
   * @param n 位数
   * @returns {boolean}
   */
  checkPositiveNum: (num, n) => {
    if (isNaN(num) || num == undefined || num == null) { return; }
    let newNum = Math.abs(Math.round(num * Math.pow(10, n)) / Math.pow(10, n));
    return newNum.toFixed(n)
  },
  /**
    * 保留指定小数位数的正数
    * @param bankNum 位数
    * @param n 位数
    * @returns {boolean}
    */
  checkHasEmoji(str) {
    const regEmoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig; // 如果为true，字符串含有emoji表情 ，false不含 
    return regEmoji.test(str)
  }

};

/** 数组拓展工具类 **/

const ArrayTool = {
    /**
     * 拼接数组
     * @param array
     * @param item
     * @returns {*}
     */
    concat: (array, array1) => {
        if(!Array.isArray(array)) {
            return []
        }
        if(!Array.isArray(array1)) {
            return []
        }
        let newArr=array.concat(array1);
        return newArr
    },
  /**
   * 往数组中添加元素，若数组中已有此元素，则删除重复元素，添加新的元素
   * @param array
   * @param item
   * @returns {*}
   */
   update: (array, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      if (item === value) {
        array.splice(i, 1);
      }
    }
    array.push(item);
    return array
  },

  /**
   * 往数组中添加元素，若数组中有则不再添加
   * @param array
   * @param item
   * @returns {*}
   */
   add: (array, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    for(let i = 0; i < array.length; i++) {
      let value = array[i];
      if (item === value) {
        return array
      }
    }
    array.push(item);
    return array
  },

  /**
   * 往数组中追加元素，元素追加到数组栈底
   * @param array
   * @param item
   * @returns {*}
   */
   push: (array, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.push(item);
    return array
  },

  /**
   * 往数组中追加元素，元素追加到数组栈顶
   * @param array
   * @param item
   * @returns {*}
   */
   unshift: (array, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.unshift(item);
    return array
  },

  /**
   * 往数组的指定位置插入一个元素
   * @param array
   * @param location
   * @param item
   * @returns {*}
   * @private
   */
  _splice: (array, location, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.splice(location, 0, item);
    return array
  },

  /**
   * 往数组中指定位置插入指定长度个数的元素
   * @param array
   * @param item
   * @param location
   * @returns {*}
   */
   splice_A: (array, location, length, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.splice(location, length, item);
    return array
  },

  /**
   * 删除数组中指定元素
   * @param array
   * @param item
   * @returns {*}
   */
   remove: (array, item) => {
    if(!Array.isArray(array)) {
      return []
    }
    for(let i = 0; i < array.length; i++) {
      let value = array[i];
      if (item === value) {
        array.splice(i, 1);
      }
    }
    return array
  },

  /**
   * 删除数组中最后一个元素
   * @param array
   * @returns {*}
   */
   pop: (array) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.pop();
    return array
  },

  /**
   * 删除数组中第一个元素
   * @param array
   * @returns {*}
   */
   shift: (array) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.shift();
    return array
  },

  /**
   * 删除数组中指定位置，指定长度的元素
   * @param array
   * @param location
   * @param length
   * @returns {*}
   */
   splice_D: (array, location, length) => {
    if(!Array.isArray(array)) {
      return []
    }
    array.splice(location, length);
    return array
  },

  /**
   * 判断两个数组是否相等
   * @param arr1
   * @param arr2
   * @returns {boolean}
   */
   isEqual: (array1, array2) => {
    if(!(Array.isArray(array1) && Array.isArray(array2))) {
      return false
    }
    if(array1.length !== array2.length) {
      return false
    }
    for(let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false
      }
    }
    return true
  },
  /**
     * 判断一个数组是否包含另一个数组
     * @param arr1
     * @param arr2
     * @returns {boolean}
   */
  includes: (array1, array2) => {
    if(!(Array.isArray(array1) && Array.isArray(array2))) {
        return false
    }
    for(let i = 0; i < array2.length; i++) {
        if (array1.includes(array2[i])) {
            return true
        }
    }
    return false
  },
  /**
    * 判断一个数组是否包含另一个数组
    * @param arr1
    * @param arr2
    * @returns {boolean}
  */
  isRepeat: (array1) => {
      if(!(Array.isArray(array1))) {
            return false
      }
      let hash = {};
      for (let i in array1) {
          if (hash[array1[i]]){
              return true;
          }
          hash[array1[i]] = true;
      }
      return false;
    }
};

/**
 * 深拷贝
 * @param {*} data 
 */
function deepClone(data) {

  var obj = {};
  var originQueue = [data];
  var copyQueue = [obj];
  //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
  var visitQueue = [];
  var copyVisitQueue = [];
  while(originQueue.length > 0){
    var _data = originQueue.shift();
    var _obj = copyQueue.shift();
    visitQueue.push(_data);
    copyVisitQueue.push(_obj);
    for(var key in _data) {
      var _value = _data[key];
      if(typeof _value !== 'object') {
        _obj[key] = _value;
      } else {
        //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
        var index = visitQueue.indexOf(_value);
        if(index >= 0){
          _obj[key] = copyVisitQueue[index];
        }
        originQueue.push(_value);
        _obj[key] = {};
        copyQueue.push(_obj[key]);
      }
    }
  }
  return obj;
}

/**
 * 金钱转成大写
 * @param {*} n 
 */
const moneyToChinese = (n)=> {
  if (n === '') {
    return "";
  }else if (n == 0) {
    return "零";
  }
  if (!/^(\+|-)?(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return "数据非法(最多保留2位小数的金额)";
  var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";
  var a = parseFloat(n);
  if (a < 0) {
    n = n.substr(1);
  }
  var p = n.indexOf('.');
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2);
  }

  unit = unit.substr(unit.length - n.length);

  for (var i = 0; i < n.length; i++)
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  if (a > 0) {
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");

  } else {

    return "负" + str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  }
};

/*** method **
 * JS 的 number 类型是浮点类型的，在使用中会遇到某些 Bug，比如 0.1 + 0.2 !== 0.3  需要 floatObj 函数计算
 *  add / subtract / multiply /divide
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */
const floatObj = {
  accAdd: (arg1, arg2, arg3) => {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
  },

  accSubtr: (arg1, arg2) => {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },

  accMul: (arg1, arg2) => {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length; } catch (e) { }
    try { m += s2.split(".")[1].length; } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },

  accDiv: (arg1, arg2) => {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
};

var version = require("../package.json").version;

export { ArrayTool, deepClone, floatObj, formatTime, moneyToChinese, regExpr, version };
