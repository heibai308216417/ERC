/**
* 全局配置信息， 包含网站标题，  动态组件定义
*
* @author terrfly
* @site https://www.jeepay.vip
* @date 2021/5/8 07:18
*/

/** 应用配置项 **/
export default {
  APP_TITLE: 'Jeepay商户系统', // 设置浏览器title
  ACCESS_TOKEN_NAME: 'iToken' // 设置请求token的名字， 用于请求header 和 localstorage中存在名称
}

/**
 * 与后端开发人员的路由名称及配置项
 * 组件名称 ：{ 默认跳转路径（如果后端配置则已动态配置为准）， 组件渲染 }
 * */
export const asyncRouteDefine = {
  'PayTestPage': { name: 'paytest', defaultPath: '/paytest', component: () => import ('@/views/home') }
}
