<template>
    <el-result status="info" title="500" sub-title="对不起，服务器内部错误.">
        <template #extra>
            <el-button type="primary" @click="goHome">返回主页</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
export default defineComponent({
    name: '500',
    setup() {
        const router = useRouter()

        const goHome = () => {
            router.replace('/')
        }

        return {
            goHome
        }
    }
})
</script>

<style scoped lang="scss">
.el-result {
    height: 100vh;
}
</style>