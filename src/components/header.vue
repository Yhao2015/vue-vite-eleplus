<template>
    <div class="jw_header">
        <div class="jw_headerLeft">
            <img :src="collapsePng" width="16" />
            <template v-if="meta.parent">
                <template v-for="(parent, index) in meta.parent" :key="parent.name">
                    <img :src="arrowPng" width="11" class="jw_img" v-if="index !== 0" />
                    <span :style="{ cursor: 'pointer', color: '#CCCCCC' }" @click="onJump(parent)">{{ parent.title }}</span>
                </template>
                <img :src="arrowPng" width="11" class="jw_img" />
                <span>{{ meta.title }}</span>
            </template>
            <template v-else>
                <span>{{ meta.title }}</span>
            </template>
        </div>
        <div class="jw_headerRight">
            <el-space wrap :size="16">
                <div class="jw_info">
                    <span>{{ "hi," + (userName || "超级管理员") }}</span>
                    <span class="jw_time">{{ nowTime }}</span>
                </div>
                <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <img :src="exitPng" width="16" @click="logout" />
            </el-space>
        </div>
    </div>
</template>


<script lang="ts" setup>
import collapsePng from '@/views/Index/image/collapse.png'
import exitPng from '@/views/Index/image/exit.png'
import arrowPng from '@/views/Index/image/arrow.png'
import useStore from '@/store/index'
import { dateFormat } from '@/utils/commonFun.ts'

let global: any = inject('global')
const userName = ref()
const nowTime = ref(dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss'))
setInterval(() => {
    nowTime.value = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')
}, 1000)

const router = useRouter()
const logout = async () => {
    let success = await useStore().loginOut()
    if (success) {
        ElMessage.success('退出成功！')
        router.replace('/login')
    }
}

let route = useRoute()
let meta = ref<any>({})
watch(
    () => route.meta,
    (newValue) => {
        meta.value = newValue
    },
    {
        immediate: true,
        deep: true
    }
)

let onJump = (meta: any) => {
    router.push(meta.path)
}


let getUserInfo = () => {
    global.$get('/sys/user/info').then((res: any) => {
        let { data, success } = res
        if (success) {
            userName.value = data.companyName
        }
    })
}

onMounted(() => {
    getUserInfo()
})
</script>

<style lang="scss" scoped>
.jw_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    // padding-left: 16px;
    width: 100%;

    .jw_headerLeft {
        display: flex;
        align-items: center;

        span {
            margin-left: 36px;
            font-size: 18px;
            cursor: default;
        }

        .jw_img {
            margin-left: 24px;
            margin-right: -16px;
        }
    }

    .jw_headerRight {
        display: flex;
        align-items: center;
        height: 100%;
        width: 70%;
        background: linear-gradient(270deg, rgba(39, 122, 255, 0.24) 0%, rgba(39, 122, 255, 0) 100%);
        justify-content: flex-end;

        .jw_info {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;

            .jw_time {
                font-size: 12px;
                font-weight: normal;
                color: #ccc;
                line-height: 13px;
                font-family: 'D-DIN';
                margin-top: 6px;
            }
        }
    }
}
</style>