<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import useStore from '@/store/index'
import usernamePng from './image/username.png'
import passwordPng from './image/password.png'
import linePng from './image/line.png'
sessionStorage.clear()

const title = '管理系统'

export interface FormState {
    username: string;
    password: string;
}

const formState = reactive<FormState>({
    username: '',
    password: ''
});

const formRef = ref<FormInstance>()
const rules = reactive<FormRules<FormState>>({
    username: [
        { required: true, message: '你还没有输入用户名！', trigger: 'change' }
    ],
    password: [
        { required: true, message: '你还没有输入密码！', trigger: 'change' }
    ]
})

const loading = ref<boolean>(false)
const router = useRouter()

const onLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            let params = toRaw(formState)
            try {
                let success = await useStore().login(params)
                loading.value = false
                if(success) {
                    ElMessage.success('登录成功！')
                    router.replace({ name: 'index' })
                }
            } catch (err) {
                loading.value = false
            }
        }
    })
}

let urlParams = new URLSearchParams(window.location.search)
if(urlParams.get('door')) {
    useStore().onJump(urlParams.get('token') as string).then(() => {
        router.replace({ name: 'index' })
    })
}

let inputRef = ref()
onMounted(() => {
    setTimeout(() => inputRef.value.focus(), 0)
})
</script>

<template>
    <div class="jw_login">
        <div class="jw_loginBox">
            <div class="jw_title">{{ title }}</div>
            <div class="jw_title_bg"></div>

            <el-form ref="formRef" :model="formState" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="formState.username" ref="inputRef">
                        <template #prefix>
                            <el-space :size="12">
                                <img :src="usernamePng" />
                                <img :src="linePng" />
                            </el-space>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="formState.password" autocomplete="off">
                        <template #prefix>
                            <el-space :size="12">
                                <img :src="passwordPng" />
                                <img :src="linePng" />
                            </el-space>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="jw_btn" :loading="loading" @click="onLogin(formRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(./index.scss);
</style>