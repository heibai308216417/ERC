/*
 *  全系列 restful api格式, 定义通用req对象
 *
 *  @author terrfly
 *  @site https://www.jeepay.vip
 *  @date 2021/5/8 07:18
 */

import request from '@/http/request'

/** 首页统计 **/
export const API_URL_MAIN_STATISTIC = '/api/mainChart'

const api = {
  user: '/user',
  role_list: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  order_checksn:'/order/checksn'
}

export default api

/** 获取权限树状结构图 **/
export function getEntTree () {
  return request.request({ url: '/api/sysEnts/showTree', method: 'GET' })
}

/** 更新用户角色信息 */
export function uSysUserRoleRela (sysUserId, roleIdList) {
  return request.request({
    url: '/api/sysUserRoleRelas/relas/' + sysUserId,
    method: 'POST',
    data: { roleIdListStr: JSON.stringify(roleIdList) }
  })
}

export function getRoleList (parameter) {
  return request({
    url: '/api/sysRoles',
    method: 'get',
    params: parameter
  })
}

/** 根据支付接口查询支付参数配置 **/
export function getMchPayConfigUnique (infoId, ifCode) {
  return request.request({
    url: '/api/mch/payConfigs/' + infoId + '/' + ifCode,
    method: 'get'
  })
}

/** 支付体验配置 **/
export function payTest (appId) {
  return request.request({
    url: '/api/paytest/payways/' + appId,
    method: 'GET'
  })
}

export function checkorderstatus (parameter) {
  return request.request({
    url: '/api/order/checkorderstatus',
    method: 'POST',
    data: parameter
  })
}

//抠章服务支付
export function paysealorder (parameter) {
  return request.request({
    url: '/api/order/payseal',
    method: 'POST',
    data: parameter
  })
}

/** 支付体验下单配置 **/
export function payTestOrder (parameter) {
  return request.request({
    url: '/api/order/pay',
    method: 'POST',
    data: parameter
  })
}
//api/conf/list   配置项管理
export function conf_list (parameter) {
  return request.request({
    url: '/api/conf/list',
    method: 'POST',
    data: parameter
  })
}

// api/price/getPriceByfuwu
export function getPriceByfuwu (parameter) {
  return request.request({
    url: '/api/price/getPriceByfuwu',
    method: 'POST',
    data: parameter
  })
}

// /api/order/payrecharge
export function getPriceByfuwu_payrecharge (parameter) {
  return request.request({
    url: '/api/order/payrecharge',
    method: 'POST',
    data: parameter
  })
}



export function refund_getrestnum (parameter) {
  return request.request({
    url: '/api/refund/getrestnum',
    method: 'POST',
    data: parameter
  })
}
export function order_checksn (parameter) {
  return request.request({
    url: '/api/order/checksn',
    method: 'POST',
    data: parameter
  })
}

export function getpricelist (parameter) {
  return request.request({
    url: '/api/price/getprice',
    method: 'POST',
    data: parameter
  })
}



export function getsealprice (parameter) {
  return request.request({
    url: '/api/price/getsealprice',
    method: 'POST',
    data: parameter
  })
}

/** 价格单价 **/
export function price_getPrice (parameter) {
  return request.request({
    url: '/api/price/getPrice',
    method: 'POST',
    data: parameter
  })
}
//api/price/getPriceBydaiban
export function getPriceBydaiban (parameter) {
  return request.request({
    url: '/api/price/getPriceBydaiban',
    method: 'POST',
    data: parameter
  })
}

//api/price/getPriceByyouji
export function price_getPriceByyouji (parameter) {
  return request.request({
    url: '/api/price/getPriceByyouji',
    method: 'POST',
    data: parameter
  })
}
//order/orderList /** 价格xiuhai 单价 **/
export function order_orderList (parameter) {
  return request.request({
    url: '/api/order/orderList',
    method: 'POST',
    data: parameter
  })
}


///company/servicetime
export function company_servicetime (parameter) {
  return request.request({
    url: '/api/order/getTime',
    method: 'POST',
    data: parameter
  })
}



/** 根据支付方式查询可用支付接口 **/
export function getAvailablePayInterfaceList (appId, wayCode) {
  return request.request({
    url: '/api/mch/payPassages/availablePayInterface/' + appId + '/' + wayCode,
    method: 'GET'
  })
}

export function getPayAmountWeek () {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/payAmountWeek',
    method: 'GET'
  })
}

export function getNumCount () {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/numCount',
    method: 'GET'
  })
}

export function getPayCount (parameter) {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/payCount',
    method: 'GET',
    params: parameter
  })
}

export function getPayType (parameter) {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/payTypeCount',
    method: 'GET',
    params: parameter
  })
}

export function getMainUserInfo () {
  return request.request({
    url: API_URL_MAIN_STATISTIC,
    method: 'GET'
  })
}

export function updateUserPass (parameter) {
  return request.request({
    url: '/api/current/modifyPwd',
    method: 'put',
    data: parameter
  })
}

export function updateUserInfo (parameter) {
  return request.request({
    url: '/api/current/user',
    method: 'put',
    data: parameter
  })
}

export function getUserInfo () {
  return request.request({
    url: '/api/current/user',
    method: 'get'
  })
}

/** 获取到webSocket的前缀 （ws://localhost） **/
export function getWebSocketPrefix () {
  // 获取网站域名 +  端口号
  let domain = document.location.protocol + '//' + document.location.host

  // 判断api_base_url 是否设置
  if (process.env.VUE_APP_API_BASE_URL && process.env.VUE_APP_API_BASE_URL !== '/') {
    domain = process.env.VUE_APP_API_BASE_URL
  }

  if (domain.startsWith('https:')) {
    return 'wss://' + domain.replace('https://', '')
  } else {
    return 'ws://' + domain.replace('http://', '')
  }
}

/** 查询支付宝授权地址URL **/
export function queryAlipayIsvsubMchAuthUrl (mchAppId) {
  return request.request({
    url: '/api/mch/payConfigs/alipayIsvsubMchAuthUrls/' + mchAppId,
    method: 'GET'
  })
}

/** 查询商户转账支出的接口 **/
export function queryMchTransferIfCode (appId) {
  return request.request({
    url: '/api/mchTransfers/ifCodes/' + appId,
    method: 'GET'
  })
}

/** 获取渠道用户ID二维码地址 **/
export function getChannelUserQrImgUrl (ifCode, appId, extParam) {
  return request.request({
    url: '/api/mchTransfers/channelUserId',
    method: 'GET',
    params: { ifCode, appId, extParam }
  })
}

/** 转账 **/
export function doTransfer (parameter) {
  return request.request({
    url: '/api/mchTransfers/doTransfer',
    method: 'POST',
    data: parameter
  }, true, true, true)
}

/** 查询当前应用支持的支付接口 **/
export function getIfCodeByAppId (appId) {
  return request.request({
    url: '/api/mch/payConfigs/ifCodes/' + appId,
    method: 'GET'
  }, true, true, true)
}

/** 退款接口 */
export function payOrderRefund (payOrderId, refundAmount, refundReason) {
  return request.request({
    url: '/api/payOrder/refunds/' + payOrderId,
    method: 'POST',
    data: { refundAmount, refundReason }
  })
}

/** 分账重试 */
export function resendDivision (recordId) {
  return request.request({
    url: '/api/division/records/resend/' + recordId,
    method: 'POST'
  })
}

//mail_send
export function sendloginemail(data) {
  return request.request({
    url: '/api/mail/sendloginemail',
    method: 'post',
    data
  })
}


//mail_send
export function mail_send(data) {
  return request.request({
    url: '/api/mail/send',
    method: 'post',
    data
  })
}

export function userlogin(data) {
  return request.request({
    url: '/api/order/login',
    method: 'post',
    data
  })
}


//order_orderlist
export function order_orderlist(data) {
  return request.request({
    url: '/api/order/orderlist',
    method: 'post',
    data
  })
}

//refund/refund
export function refund_refund(data) {
  return request.request({
    url: '/api/refund/refund',
    method: 'post',
    data
  })
}

export function login_userlogin (parameter) {
  return request.request({
    url: '/api/login/userLogin',
    method: 'POST',
    data: parameter
  })
}

export function login(data) {
  return request({
    url: '/api/login/userLogin',
    method: 'post',
    data
  })
}


// api/mail/sendByCw
export function mail_sendByCw(data) {
  return request.request({
    url: '/api/mail/sendByCw',
    method: 'post',
    data
  })
}

//api/refund_orderList
export function refund_orderList(data) {
  return request.request({
    url: '/api/refund/orderList',
    method: 'post',
    data
  })
}

//refund/audit
export function refund_audit(data) {
  return request.request({
    url: '/api/refund/audit',
    method: 'post',
    data
  })
}
