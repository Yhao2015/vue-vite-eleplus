import axios, { AxiosInstance, AxiosRequestConfig, Canceler } from 'axios'
import router from '../router'
import useStore from '@/store/index'
import { stringify } from 'qs'
import { ElMessage } from 'element-plus'
import JSEncrypt from 'jsencrypt'


console.log(import.meta.env.VITE_BASE_URL)
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '/',
    timeout: 36000000 //设置超时时间
})

// 加密
const encryptRSA = (str: string) => {
    const encryptor = new JSEncrypt()
    const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCosgdi/hTJ59SpnvsgzG37J2TcpHMqqTzsYU2kN2PMqTpmBWlTbQVv4XPmlEWqJaeHlL06bweXBOCoHxwmdAdBldUFvFmgeJpOLG4Xbp6EXvbxSvFus3tuxAmc+40oAL5a2sdaH6Oy0y/cpwYakP8V9UHFCLTYXT+/mnuZKLMbawIDAQAB`
    encryptor.setPublicKey(publicKey)
    const rsaPassWord = encryptor.encrypt(str)
    return rsaPassWord
}

// 解密
const decryptRSA = (str: string) => {
    const encryptor = new JSEncrypt() // 新建JSEncrypt对象
    const privateKey = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALHr+hwbCu0XucZPvDtYYzPRokaud93XXjum1637fE8b2TAIdPwCfvR3f5nZP8UQralqeC/CmAI2QxDG0eKSGe3QTiFnqg5KGS5L8WPJOlRkAyrwIy/wPtpw11yRWiaI9u0v9GMU8hRSonsQF85pWSkmnhgl+3l2UQxNuXIrfD2/AgMBAAECgYB94kle019iqvO9NTMoBfyCcGNRgSW8JyI8MGrPZWzph/md+43RtG5gx5/XmZd99bP5dyQ8HoFwpzXCS/m6Rcbjg+ykLlsVR+nYgNYwLXbKWqspkDYgx64jgmSrubFT2T8LX7jHYaUCNwSjn2Tr+pVuyiiVnZjNFn4DkXl98CyrMQJBAPZdYNL078MgNwRij32uoIv2KP5w22DPW3gfC2ENk+REG5UI0UthhS+hQUOoaAOD1/vxZ1yR0kmgnGEl4iPj0QcCQQC44Ve/3mEQxMp08+U1JyrZv5eCc5n/gseQNpuWMtkLB4/GXntGtJhSy3WctZA89aVDha+7NH5lNkDPs51nOFeJAkB46t/o6nr7REZ8intu7lSyHUGFkJK780orrOEC440gziTTgx5mZxjdhcHomTFj+EP7zkIy9wdFR+U48UUK5HflAkBOnlzvVYSXWefyNekJYl+Be0zVh408L4PnmqEtDPBpFU0ZgQIRPijsRGL+QeNVWOxvO0FQbXE2XwzOhkXwJ/BpAkEA8bfmMkJshWhxa8RONAuf8EPj8xjt9XFO/thUZWhUNQqR62Y9wRXabxY1u/yGt0DNfewbI0b6iEsO3wDYKKduQg==` // 私钥串
    encryptor.setPrivateKey(privateKey) //设置私钥
    const decrytStr = encryptor.decrypt(str)
    return decrytStr
}

// 防抖
const pendingRequest = new Map()
//generateReqKey：用于根据当前请求的信息，生成请求Key存放到map中作为当前请求的键；
function generateReqKey(config: AxiosRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function addPendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config)
    /* 这下面的部分不能去除的原因是因为在清空所有请求的时候需要用到cancel令牌
    所以必须在添加请求的时候就创建一个CancelToken取消令牌用于之后clearPending函数清空请求 */
    config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
        //创建当前请求放到map中
        pendingRequest.set(requestKey, cancel)
    })
}

//去除所有列表里的请求（用于跳转路由等需要清空请求的情况）
function clearPending() {
    //遍历map对象，用每个取消令牌逐一取消请求，起到清空所有请求的作用
    for (const [requestKey, cancelToken] of pendingRequest) {
        cancelToken(requestKey)
    }
    //清空map对象
    pendingRequest.clear()
}

// 请求前的统一处理
service.interceptors.request.use(
    /*
        这里config类型设置为any而不设置为AxiosRequestConfig是因为之后为了取消当前请求使用了return false
        而axios请求拦截器允许返回的类型是AxiosRequestConfig | Promise<AxiosRequestConfig>
        如果返回了Boolean就会报错，为了方便直接设置为any，当然你也可以自己去修改axios的ts类型声明文件，使其允许返回Boolean 
    */
    (config: any) => {
        if ((config.url as string).includes('sys/login')) {
            config.data = {
                str: encryptRSA(JSON.stringify(config.data))
            }
        } else {
            const requestKey = generateReqKey(config)
            if (pendingRequest.has(requestKey)) {
                /*如果请求参数全部相同，表示是重复的请求，那么保留最初的，取消当前的请求
                传统的用token令牌取消的请求，实际上还会发送到后端，只是前端被取消了而已
                但是这里在请求拦截器就return false直接取消了发送请求
                这个请求实际在发送之前就被拦截发送了而不是取消，所以后端是接收不到这个请求的 */
                return false
            }
            // 把当前请求信息添加到pendingRequest对象中
            addPendingRequest(config)
            config.headers['token'] = useStore().token
        }
        return config
    },
    (error) => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
        pendingRequest.clear()
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        /*  
            这里使用JSON.parse()的原因是：响应拦截器中收到的response.config.data还是json字符串格式
            如果直接传入字符串生成key会与之前添加时创建的key不符合（进行了两次JSON.stringify(data)，会无法正常删除map的请求 
        */
        response.config.data = response.config.data && JSON.parse(response.config.data)
        const requestKey = generateReqKey(response.config)
        //根据key删除当前请求
        pendingRequest.delete(requestKey)


        let res = response.data
        if (res.success) {
            return response
        } else {
            showError(res)
            if (res.code === '401') {
                router.push('/login')
            }
            return Promise.reject(response)
        }
    },
    (error) => {
        //此处同上
        error.config.data = error.config.data && JSON.parse(error.config.data)
        const requestKey = generateReqKey(error.config)
        // 从pendingRequest对象中移除请求
        pendingRequest.delete(requestKey)

        if (error.response.status == '502') {
            showError({ msg: '后台服务重启中，请稍后' })
            router.push('/login')
        } else {
            showError(error.response.data)
        }
        return Promise.reject(error.response)
    }
)

function showError(error: any) {
    ElMessage({
        message: error.msg || error.message || '服务异常',
        type: 'error',
        duration: 3 * 1000
    })
}

const request = {
    get: (path = '', params?: any, isQs?: boolean) => {
        return new Promise((resolve, reject) => {
            ;(isQs
                ? service.get(path, {
                      params: params,
                      paramsSerializer: (params) => {
                          return stringify(params, { indices: false })
                      }
                  })
                : service.get(path, { params: params })
            )
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    post: (path = '', params: any, contentType: string = 'application/json;charset=utf-8') => {
        return new Promise((resolve, reject) => {
            service
                .post(path, params, {
                    headers: {
                        'Content-Type': contentType
                    }
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    put: (path = '', params: any) => {
        return new Promise((resolve, reject) => {
            service
                .put(path, params)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    del: (path = '', params: any) => {
        return new Promise((resolve, reject) => {
            service
                .delete(path, {
                    data: params, // 请求参数放在请求体
                    params: params // 请求参数拼接在url上,有需要单独写
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export { service, clearPending }

export default request
