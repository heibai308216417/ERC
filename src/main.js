// with polyfills
import axios from 'axios'
Vue.prototype.$ajax = axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import Antd from 'ant-design-vue';
Vue.use(Antd);
import './core/lazy_use' // use lazy load components
import './permission' // permission control  路由守卫
import './utils/filter' // global filter
import './global.less' // global style
import 'ant-design-vue/dist/antd.less'
import infoBox from '@/utils/infoBox'
import VueClipboard from 'vue-clipboard2' // 复制插件
Vue.use(ElementUI);

Vue.use(VueClipboard) // 复制插件
Vue.config.productionTip = false

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

/**
 * @description 全局注册权限验证
 */
Vue.prototype.$access = (entId) => {
  // eslint-disable-next-line eqeqeq
  return store.state.user.accessList.some(item => item == entId)
}

Vue.prototype.$infoBox = infoBox

window.common = {
  keyDllBase64: "", //keydll的base64字符串，控件要求的格式
  keyDll: "",//页面根据csp选项传值
  InitParam: "",//全部keyDllBase64集合，xml形式，有固定格式，在keytypelist.jsp页面赋值
  devBrand: "",//所选设备品牌
  devName: "",//所选设备名
  devSn: "",//所选设备编号
  devLabel: "",//所选设备标签
  pinCode: "", //所选设备pin码
  keyUserPinCode: "", //是否需要密码输入框
  pinCodelabel: "", //sm2ContainerName
  sm2ContainerName: "", //rsaContainerName
  rsaContainerName: "", //管理员标识
  adminKeyLabel: "admin",
  personTypeDict: "{}",
  personTypeDictDefault: "",
  industryTypeJS: "MOF",
}

new Vue({
  router,
  store,
  // init localstorage, vuex
  //created: bootstrap,
  render: h => h(App)
}).$mount('#app')
