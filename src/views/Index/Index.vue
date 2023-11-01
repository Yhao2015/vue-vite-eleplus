<template>
    <el-container>
        <el-aside width="240px">
            <div class="jw_logo"><img :src="titlePng"/></div>
            <Menu :menuData="menuData"></Menu>
        </el-aside>
        <el-container>
            <el-main>
                <my-form :formConfig="modalConfig" ref="modalRef">
                    <template #title="{ data }">
                        <div class="jw_modalTitle">
                            <img :src="data.extra.png" /> <span>{{ data.extra.text }}</span>
                        </div>
                    </template>
                </my-form>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { menuData } from './index'
import Menu from '@/components/menu.vue'
import titlePng from './image/title.png'


let modalRef = ref()
let stationList = ref([
    {
        "stationCode": "02300001",
        "stationName": "杭州炬华科技股份有限公司123"
    }
])
let options = ref([
    {
        "value": 110000,
        "label": "北京市",
        "children": [
            {
                "value": 110100,
                "label": "北京城区",
                "children": [
                    {
                        "value": 110101,
                        "label": "东城区",
                        "children": null
                    },
                    {
                        "value": 110102,
                        "label": "西城区",
                        "children": null
                    },
                    {
                        "value": 110105,
                        "label": "朝阳区",
                        "children": null
                    },
                    {
                        "value": 110106,
                        "label": "丰台区",
                        "children": null
                    },
                    {
                        "value": 110107,
                        "label": "石景山区",
                        "children": null
                    },
                    {
                        "value": 110108,
                        "label": "海淀区",
                        "children": null
                    },
                    {
                        "value": 110109,
                        "label": "门头沟区",
                        "children": null
                    },
                    {
                        "value": 110111,
                        "label": "房山区",
                        "children": null
                    },
                    {
                        "value": 110112,
                        "label": "通州区",
                        "children": null
                    },
                    {
                        "value": 110113,
                        "label": "顺义区",
                        "children": null
                    },
                    {
                        "value": 110114,
                        "label": "昌平区",
                        "children": null
                    },
                    {
                        "value": 110115,
                        "label": "大兴区",
                        "children": null
                    },
                    {
                        "value": 110116,
                        "label": "怀柔区",
                        "children": null
                    },
                    {
                        "value": 110117,
                        "label": "平谷区",
                        "children": null
                    },
                    {
                        "value": 110118,
                        "label": "密云区",
                        "children": null
                    },
                    {
                        "value": 110119,
                        "label": "延庆区",
                        "children": null
                    }
                ]
            }
        ]
    },
    {
        "value": 120000,
        "label": "天津市",
        "children": [
            {
                "value": 120100,
                "label": "天津城区",
                "children": [
                    {
                        "value": 120101,
                        "label": "和平区",
                        "children": null
                    },
                    {
                        "value": 120102,
                        "label": "河东区",
                        "children": null
                    },
                    {
                        "value": 120103,
                        "label": "河西区",
                        "children": null
                    },
                    {
                        "value": 120104,
                        "label": "南开区",
                        "children": null
                    },
                    {
                        "value": 120105,
                        "label": "河北区",
                        "children": null
                    },
                    {
                        "value": 120106,
                        "label": "红桥区",
                        "children": null
                    },
                    {
                        "value": 120110,
                        "label": "东丽区",
                        "children": null
                    },
                    {
                        "value": 120111,
                        "label": "西青区",
                        "children": null
                    },
                    {
                        "value": 120112,
                        "label": "津南区",
                        "children": null
                    },
                    {
                        "value": 120113,
                        "label": "北辰区",
                        "children": null
                    },
                    {
                        "value": 120114,
                        "label": "武清区",
                        "children": null
                    },
                    {
                        "value": 120115,
                        "label": "宝坻区",
                        "children": null
                    },
                    {
                        "value": 120116,
                        "label": "滨海新区",
                        "children": null
                    },
                    {
                        "value": 120117,
                        "label": "宁河区",
                        "children": null
                    },
                    {
                        "value": 120118,
                        "label": "静海区",
                        "children": null
                    },
                    {
                        "value": 120119,
                        "label": "蓟州区",
                        "children": null
                    }
                ]
            }
        ]
    },
])
let modalConfig = reactive({
    formConfigData: [
        {
            code: '',
            type: '',
            slot: 'title',
            show: true,
            extra: {
                text: '基础信息',
                png: new URL('./image/info.png', import.meta.url).href
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
            code: 'roleId',
            label: '用户类型',
            type: 'radio',
            show: true,
            required: true,
            changeFunName: 'roleIdChange',
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
            code: '',
            type: '',
            slot: 'title',
            show: true,
            extra: {
                text: '详细地址',
                png: new URL('./image/addr.png', import.meta.url).href
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
            code: 'areaCode',
            label: '所在地区',
            type: 'cascader',
            show: true,
            required: true,
            dataFormat: options.value
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
            code: '',
            type: '',
            slot: 'title',
            show: true,
            extra: {
                text: '电站分配',
                png: new URL('./image/station.png', import.meta.url).href
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
            code: 'stationCodeList',
            label: '管理电站',
            type: 'select',
            multiple: true,
            show: true,
            required: true,
            dataFormat: stationList.value,
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
        }
    },
    functions: {
        roleIdChange: (v: any) => {
            if (v === '2') {
                modalRef.value.setFieldValue('stationCodeList', { stationCodeList: stationList.value.map((it: any) => it.stationCode) })
            }
        },
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

let getEnum = () => {
    setTimeout(() => {
        (modalConfig.formConfigData.find((el) => el.code == 'roleId') as any)!.dataFormat = [
            {
                "roleId": "2",
                "roleName": "运营商"
            },
            {
                "roleId": "1678700185539239938",
                "roleName": "小鱼后台"
            },
            {
                "roleId": "1679361663247060993",
                "roleName": "新角色2"
            },
            {
                "roleId": "1690921081991053314",
                "roleName": "综合能源体验账号"
            },
            {
                "roleId": "1698583976766308353",
                "roleName": "演示专用"
            }
        ]
    }, 100)
}

getEnum()
</script>
  
<style lang="scss" scoped>
@import url('./index.scss');
</style>
  