import { createApp } from 'vue'

/* element-plus 样式 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'dayjs/locale/zh-cn'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

/* 字体 */
import './assets/font/font.css'
/* 页面公共样式 */
import './styles/index.css'

import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })

/* pinia */
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
/* 持久化存储插件 */
import piniaPluginPersist from 'pinia-plugin-persist'
pinia.use(piniaPluginPersist)

import JW from 'jw-component-library'
import 'jw-component-library/lib/style.css'
app.use(JW)

/* 路由 */
import router from './router'
app.use(router)

/* axios请求封装 */
import request from './utils/request'
import api from './api/index'
// 配置全局变量 页面中使用 inject 接收  global = inject('global')
app.provide('global',{
    $get: request.get,
    $post: request.post,
    $put: request.put,
    $del: request.del,
    $api: api
})

/* 图片懒加载 :scr="url" => v-lazy="url" */
import VueLazyload from 'vue-lazyload' 
app.use(VueLazyload, {
    attempt: 1, // 加载一屏图片
    preLoad: 1, // 失败尝试次数
})

/* 字体图标 */
import * as Icons from '@element-plus/icons-vue'
// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})

app.mount('#app')
