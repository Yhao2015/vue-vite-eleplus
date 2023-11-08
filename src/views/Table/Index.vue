<template>
    <div class="my-table">
        <my-table :tableConfig="tableConfig" :tableData="tableData" :columns="columns" >
            <template #action>
                <span class="jw_line">曲线详情</span>
            </template>
            <template #status="scope">
                <span :style="{ 'color': getMapColorName(scope.data.row.status).color }">{{ getMapColorName(scope.data.row.status).name }}</span>
            </template>
        </my-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
let global: any = inject('global')
let getMapColorName = (status: number = 0) => {
    let map: any = {
        3: { color: '#A55E60', name: '停止中' },
        2: { color: '#B28955', name: '充电中' },
        4: { color: '#3C9EEB', name: '已结束' },
        1: { color: '#357F7A', name: '启动中' },
        5: { color: '#9A9DA4', name: '未知' }
    }

    return map[status]
}

let tableConfig = reactive({
    loading: false,
    'row-key': 'orderNo',
    // 'height': 'auto',
    pagination: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    index: false,
    functions: {
        handleCurrentChange: (val: number) => {
            tableConfig.currentPage = val
        },
        handleSizeChange: (val: number) => {
            tableConfig.pageSize = val
        }
    }
})

let tableData = ref<Array<any>>([])

let columns = ref([
    {
        title: '创建时间',
        dataIndex: 'startTime',
        // width: '400',
        align: 'center'
    },
    {
        title: '订单编号',
        dataIndex: 'orderNo',
        // width: '400',
        align: 'center'
    },
    {
        title: '充电时长(h)',
        dataIndex: 'chargeHourStr',
        // width: '200',
        align: 'center'
    },
    {
        title: '充电电量(kWh)',
        dataIndex: 'totalPower',
        // width: '200',
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'status',
        fixed: 'right',
        width: '150',
        align: 'center',
        scopedSlots: 'status'
    },
    {
        title: '操作',
        dataIndex: 'action',
        // fixed: 'right',
        width: '150',
        align: 'center',
        scopedSlots: 'action'
    }
])

let getTableData = () => {
    tableConfig.loading = true
    global.$get('/mock/getTableData').then((res: any) => {
        let { success, data } = res
        tableConfig.loading = false
        if(success) {
            let { list, totalNumber } = data
            tableData.value = list || []
            tableConfig.total = totalNumber
        }
    })
}

getTableData()
</script>

<style lang="less" scoped>
.my-table {
    margin: 16px;
    width: calc(100% - 32px);
}
</style>
