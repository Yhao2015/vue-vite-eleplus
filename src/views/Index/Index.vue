<template>
    <el-container>
        <el-aside width="240px">
            <div class="jw_logo"></div>
            <Menu :menuData="menuData"></Menu>
        </el-aside>
        <el-container>
            <el-header> <Header></Header> </el-header>
            <el-main>
                <router-view v-slot="{ Component }">
                    <component :is="Component" :key="$route.fullPath" />
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { menuData } from './index'
import Menu from '@/components/menu.vue'
import Header from '@/components/header.vue'
</script>
  
<style lang="scss" scoped>
@import url('./index.scss');
</style>
  