import { createRouter, createWebHistory } from 'vue-router'
import { routeMap } from './router.config'
import NProgress from 'nprogress'
import useStore from '@/store/index'

NProgress.configure({ showSpinner: false })

const router = createRouter({
    history: createWebHistory('./'),
    routes: routeMap
})

const whiteList = ['/login', '/404', '/403', '/500']
// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
    NProgress.start()
    if(useStore().token) {
        next()
    } else if(whiteList.includes(to.path)) {
        next()
    } else {
        next('/login')
    }
})

// 路由跳转后的监听操作
router.afterEach(() => {
    NProgress.done()
})

export default router
