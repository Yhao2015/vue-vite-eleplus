<template>
    <el-menu :default-active="activeKey" active-text-color="#ffffff" text-color="#999999" :collapse="isCollapse" @select="onSelect">
        <template v-for="item in menuData">
            <template v-if="item.children">
                <el-sub-menu :index="(<string>(item.path))">
                    <template #title>
                        <img :src="(activeKey == item.path || item.children.findIndex(o => o.path == activeKey) > -1) ? item.icon[0] : item.icon[1]"
                            width="22" class="marginR6" />
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="child.path" v-for="child in item.children">
                        <div class="jw_line"></div>
                        <div :class="['jw_box marginL6 marginR6', { 'jw_check': activeKey == child.path }]"></div>
                        <span>{{ child.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :index="item.path">
                    <img :src="activeKey == item.path ? item.icon[0] : item.icon[1]" width="22" class="marginR6" />
                    <template #title>{{ item.name }}</template>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts" setup>
const isCollapse = ref(false)
interface menuDataProp {
    name?: string,
    path?: string,
    children?: menuDataProp[],
    icon?: any
}

defineProps({
    menuData: {
        type: Array as PropType<menuDataProp[]>,
        default: () => []
    }
})

let activeKey = ref<string>('')
let route = useRoute()
watch(
    () => [route.name, route.meta],
    ([newValue, meta]) => {
        parent = (meta as any) ?.parent
        activeKey.value = parent ? parent[0].name : (newValue as string)
    },
    {
        immediate: true,
        deep: true
    }
)

let router = useRouter()
let onSelect = (index: string) => {
    activeKey.value = index
    router.push({ name: index })
}
</script>

<style lang="scss" scoped>
.el-menu {
    border-right: 0;

    li.is-active > .el-sub-menu__title span {
        color: var(--el-menu-active-color);
    }
}

.jw_box {
    width: 10px;
    height: 10px;
    background: rgba(153, 153, 153, 0.4);
    border-radius: 2px;
    border: 1px solid #999999;
}

.jw_check {
    border: 1px solid #049DFF;
    background: rgba(4,157,255,0.4);
}

.jw_line {
    width: 10px;
    height: 44px;
    border: 1px solid #555555;
    position: absolute;
    top: -20px;
    left: 30px;
    border-top: 0;
    border-right: 0;
    border-radius: 2px;
}

.el-menu-item:not(:first-child) > .jw_line {
    height: 50px;
    top: -28px;
}
</style>