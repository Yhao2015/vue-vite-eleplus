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
        name: 'Demo',
        path: 'information',
        icon: [informationPng, uninformationPng],
        children: [
            {
                path: 'form',
                name: '表单'
            },
            {
                path: 'table',
                name: '表格'
            }
        ]
    },
    {
        name: 'EChart',
        path: 'chart',
        icon: [monitorPng, unmonitorPng]
    }
])
