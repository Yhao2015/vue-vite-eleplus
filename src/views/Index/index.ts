interface MenuData {
    name: string
    path: string
    icon?: Array<string>
    children?: MenuData[]
}

import monitorPng from './image/monitor.png'
import unmonitorPng from './image/unmonitor.png'
import informationPng from './image/information.png'
import uninformationPng from './image/uninformation.png'

export const menuData = reactive<MenuData[]>([
    {
        name: '实时监测',
        path: 'monitor',
        icon: [monitorPng, unmonitorPng]
    },
    {
        name: '信息管理',
        path: 'information',
        icon: [informationPng, uninformationPng],
        children: [
            {
                path: 'site',
                name: '站点管理'
            },
            {
                path: 'car',
                name: '车辆管理'
            },
            {
                path: 'user',
                name: '人员管理'
            }
        ]
    }
])
