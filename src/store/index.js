import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import info from './modules/info'
import asyncRouter from './modules/async-router'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    // 定义全局loading 为false
    globalLoading: false,
    counter:0,
  },
  mutations: {
    // 显示与关闭 全局 loading
    showLoading (state) {
      state.globalLoading = true
    },
    hideLoading (state) {
      state.globalLoading = false
    },
    changenumber (state,count){
      console.log('vuex')
      console.log(count)
      state.counter = state
    }

  },
  actions: {

  },
  getters:{

  },
  modules: {
    info,
    user, // 用户相关状态机
    asyncRouter // 动态菜单
  },
})
