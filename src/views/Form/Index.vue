<template>
    <div>
        <el-card header="查询框">
            <my-form :formConfig="formConfig" ref="formRef">
                <template #btn>
                    <el-button :icon="Search" type="primary">查询</el-button>
                </template>
            </my-form>
        </el-card>

        <el-card header="新增表单" :style="{ 'marginTop': '24px' }">
            <my-form :formConfig="formConfig2" ref="formRef">
                <template #btn>
                    <el-button :icon="Search" type="primary" @click="onSearch">查询</el-button>
                </template>
            </my-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
let global: any = inject('global')


let formConfig = reactive({
    formConfigData: [
        {
            code: 'stationName',
            label: '站点名称',
            type: 'select',
            show: true,
            dataFormat: [],
            fieldName: {
                value: 'stationCode',
                label: 'stationName'
            }
        },
        {
            code: 'pileDceName',
            label: '充电桩编号',
            type: 'input',
            show: true
        },
        {
            label: '查询时间',
            code: 'dateRange',
            type: 'daterange',
            show: true,
            formClassName: 'jw_daterange'
        },
        {
            code: '',
            slot: 'btn',
            type: '',
            show: true,
            formClassName: 'pull-right'
        }
    ],
    formConfigBase: {
        inline: true,
        'label-width': 90
    },
    functions: {}
})

let formConfig2 = reactive({
    formConfigData: [
        {
            code: 'roleId',
            label: '用户类型',
            type: 'radio',
            show: true,
            required: true,
            dataFormat: [],
            fieldName: {
                value: 'roleId',
                label: 'roleName'
            },
            grid: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                xl: 24
            }
        },
        {
            code: 'name',
            label: '用户名称',
            type: 'input',
            show: true,
            required: true,
            checkFunName: 'checkNameLength'
        },
        {
            code: 'username',
            label: '登录账号',
            type: 'input',
            show: true,
            required: true,
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            help: '请输入正确的手机号'
        },
        {
            code: 'areaCode',
            label: '所在地区',
            type: 'cascader',
            show: true,
            required: true,
            dataFormat: []
        },
        {
            code: 'addr',
            label: '详细地址',
            type: 'input',
            show: true,
            required: true,
            checkFunName: 'checkAddrLength'
        },
        {
            code: 'stationCodeList',
            label: '管理电站',
            type: 'select',
            multiple: true,
            show: true,
            required: true,
            dataFormat: [],
            defaultValue: [],
            fieldName: {
                value: 'stationCode',
                label: 'stationName'
            }
        }
    ],
    formConfigBase: {
        inline: false,
        'label-position': 'right',
        grid: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12
        },
        'item-bottom': '24px'
    },
    functions: {
        checkNameLength: (_: any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else {
                if (value.length > 20) {
                    callback(new Error('用户名不能超过20个字'))
                } else {
                    callback()
                }
            }
        },
        checkAddrLength: (_: any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('请输入详细地址'))
            } else {
                if (value.length > 30) {
                    callback(new Error('详细地址不能超过30个字'))
                } else {
                    callback()
                }
            }
        }
    }
})

let getStationList = () => {
    global.$get('/mock/station/stationList').then((res: any) => {
        let { success, data } = res
        if(success) {
            ;(formConfig.formConfigData.find(el => el.code == 'stationName') as any).dataFormat = data || [];
            (formConfig2.formConfigData.find(el => el.code == 'stationCodeList') as any).dataFormat = data || [];
        }
    })
}

let getRoleList = () => {
    global.$get('/mock/sys/user/role/select').then((res: any) => {
        let { success, data } = res
        if(success) {
            (formConfig2.formConfigData.find(el => el.code == 'roleId') as any).dataFormat = data || [];
        }
    })
}

let getAreaCode = () => {
    global.$get('/mock/sys/map/tree').then((res: any) => {
        let { success, data } = res
        if(success) {
            (formConfig2.formConfigData.find(el => el.code == 'areaCode') as any).dataFormat = data.options || [];
        }
    })
}

getStationList()
getRoleList()
getAreaCode()

let onSearch = () => { }
</script>

<style lang="less" scoped>
:deep(.jw_daterange) {
    width: 400px !important;
}

:deep(.pull-right) {
    float: right;
}
</style>