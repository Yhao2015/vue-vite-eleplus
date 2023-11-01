<template>
    <el-result icon="warning" title="403" sub-title="对不起，您没有权限访问此页面.">
        <template #extra>
            <el-button type="primary" @click="goHome">返回主页</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
export default defineComponent({
    name: '403',
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