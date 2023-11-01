import { defineStore } from 'pinia' // 定义容器
import { service } from '@/utils/request'
import { loginFormState } from '@/definitions/index'
import api from '@/api/index'

const useUserStore = defineStore('useStore', {
    /**
     * 存储全局状态
     * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
     * 和 TS 类型推导
     */
    state: () => {
        return {
            token: '',
            userInfo: '',
            menuList: []
        }
    },
    /**
     * 用来封装计算属性 有缓存功能  类似于computed
     */
    getters: {},
    /**
     * 编辑业务逻辑  类似于methods
     */
    actions: {
        login(params: loginFormState) {
            return new Promise<boolean>((resolve, reject) => {
                service.post(api.login.loginUrl, params).then((res: any) => {
                    this.token = res.headers.token
                    resolve(res.data.success)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        loginOut() {
            return new Promise((resolve) => {
                service.get(api.login.logoutUrl).then((res: any) => {
                    this.token = ''
                    this.userInfo = ''
                    this.menuList = []
                    resolve(res.data.success)
                })
            })
        },
        onJump(token: string) {
            return new Promise<void>((resolve) => {
                this.token = token
                resolve()
            })
        }
    },
    persist: {
        enabled: true, // 开启缓存  默认会存储在本地localstorage
        strategies: [
            {
                storage: sessionStorage, // 缓存使用方式
                paths: ['token', 'userInfo', 'menuList'] // 需要缓存键
            }
        ]
    }
})

export default useUserStore