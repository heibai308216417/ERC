import Vue from 'vue'
import Router from 'vue-router'
import { BlankLayout } from '@/layouts'
import blankLayout from "@/layouts/BlankLayout";

// hack router push callback
// [解决 vue-router跳转相同路径报错 ]
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// 纯静态路由配置项
const constantRouterMap = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/home/homepage.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () =>
                    import ('@/views/home/index')
            },
            {
                path: 'login',
                name: 'login',
                component: () =>
                    import ('@/views/user/login')
            },
            {
                path: 'orderlist',
                name: 'orderlist',
                component: () =>
                    import ('@/views/user/orderlist')
            },
            {
                path: 'index',
                name: 'index',
                component: () =>
                    import ('@/views/seal/seal')
            },

            {
                path: 'orderancell',
                name: 'orderancell',
                component: () =>
                    import ('@/views/user/orderancell')
            },
            {
                path: 'invoice',
                name: 'invoice',
                component: () =>
                    import ('@/views/user/invoice')
            },
            {
                path: 'check',
                name: 'check',
                component: () =>
                    import ('@/views/recharge/check')
            },
            {
                path: 'seal',
                name: 'seal',
                component: () =>
                    import ('@/views/service/seal')
            },
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: blankLayout,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import ('@/views/user/login')
            },
            {
                path: 'orderlist',
                name: 'orderlist',
                component: () =>
                    import ('@/views/user/orderlist')
            },
            {
                path: 'orderancell',
                name: 'orderancell',
                component: () =>
                    import ('@/views/user/orderancell')
            },
            {
                path: 'invoice',
                name: 'invoice',
                component: () =>
                    import ('@/views/user/invoice')
            }
        ]
    },




]

export default new Router({
    mode: 'history',
    routes: constantRouterMap
})