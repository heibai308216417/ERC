import router from './router'
// import {getToken} from '@/utils/auth' // get token from cookie
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle } from '@/utils/domUtil'
import appConfig from '@/config/appConfig'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${appConfig.APP_TITLE}`)) // 设置浏览器标题

    next()
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    return false
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
