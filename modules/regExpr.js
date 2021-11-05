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
  }

}

export { regExpr }
