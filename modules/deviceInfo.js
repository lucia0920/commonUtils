
/**
 * Created by guangqiang on 2017/8/27.
 */

/** 设备信息 **/
import {goMd5} from "./http/smsVerifyUtil"

import {Dimensions, Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
export default deviceInfo = {
  // 设备宽度
  deviceWidth: Dimensions.get('window').width,
  // 设备高度
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
  isIphoneX: (Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812)||(Dimensions.get('window').width === 414 && Dimensions.get('window').height === 896),
  // 设备系统
  deviceOS: Platform.OS,
  deviceOSType:Platform.OS==='ios'?2:1,
  // 当前config: debug \ release
  mode: __DEV__ ? 'xdebug' : 'release',
  //当前设备id
  getUniqueID:goMd5(DeviceInfo.getUniqueID()),
  //手机型号
  mobileType:DeviceInfo.getSystemName()+" "+DeviceInfo.getSystemVersion(),
  //手机品牌
  mobileBrand: DeviceInfo.getBrand(),

  //手机IP
  mobileIp: DeviceInfo.getIPAddress().then(res => {
    return res
  })
}
