<template>
    <el-result icon="error" title="404" sub-title="对不起，您访问的页面不存在.">
        <template #extra>
            <el-button type="primary" @click="goHome">返回主页</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
export default defineComponent({
    name: '404',
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