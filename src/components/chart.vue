<template>
    <div :style="cssStyle()">
        <el-empty description="暂无数据" v-if="isEmpty" />
        <div ref="eChartRef" :style="{ width: '100%', height: '100%' }"></div>
    </div>
</template>

<script setup lang="ts">
import { chartProp } from '@/definitions/chart'
import { merge } from 'lodash'
import darkJson from './dark.json'
import { base_options, base_extraOption } from '@/utils/baseChart'
const prop = defineProps({
    width: {
        type: [Number, String],
        default: '100%'
    },
    height: {
        type: [Number, String],
        default: '100%'
    },
    theme: {
        type: String,
        default: 'light'
    },
    options: {
        type: Object as PropType<chartProp>,
        default: () => { }
    },
    extraOption: {
        type: Object,
        default: () => { }
    },
    functions: {
        type: Object,
        default: () => { }
    },
    isDefaultOption: {
        type: Boolean,
        default: true
    }
})
const cssStyle = () => {
    let { width, height } = prop
    let obj = {
        width: typeof width == 'string' ? width : width + 'px',
        height: typeof height == 'string' ? height : height + 'px',
        overflow: 'hidden'
    }

    return obj
}
const isEmpty = ref(true)
let chart = ref<any>(null)
const eChartRef = ref()

const methods = {
    initOption() {
        if (chart.value) {
            chart.value.clear()
            setTimeout(() => {
                let options = methods.analysis()
                chart.setOption(options, true)
            }, 100)
        } else {
            setTimeout(() => methods.initChart(), 0)
        }
    },
    initChart() {
        let echarts = (window as any).echarts
        if(prop.theme == 'dark') {
            echarts.registerTheme('dark', darkJson)
        } 
        chart = echarts.init(eChartRef.value, prop.theme)

        let { functions } = prop
        chart.setOption(methods.analysis(), true)

        if (functions && Object.keys(functions).length) {
            for (let key in functions) {
                let flag = typeof functions[key] == 'function'
                if (flag) {
                    chart.value.on(key, (params: any) => {
                        functions[key](params)
                    })
                }
            }
        }
    },
    analysis() {
        let chartData = {}, extraOption = {}
        if(prop.isDefaultOption) {
            if(base_options && Object.keys(base_options).length) {
                chartData = merge({}, base_options, prop.options)
            }

            if(base_extraOption && Object.keys(base_extraOption).length) {
                extraOption = merge({}, base_extraOption, prop.extraOption)
            }
        }
        
        let { series, xAxis, legend, config } = chartData as any
        // 暂无数据 
        if (!series || series.length == 0) {
            isEmpty.value = true
            return {}
        }

        /* // TODO
        if(series ?.length) {
            let temp = series.filter((el: any) => !el.yAxisIndex)
        } */

        isEmpty.value = false

        let options: any = {
            backgroundColor: 'transparent',
            grid: {
                containLabel: true
            },
            xAxis: [],
            yAxis: [],
            series: []
        }

        if (!config) {
            config = {
                label: false,
                tooltip: false,
                legend: false,
                zoom: false
            }
        }

        let type = [...new Set(series.map((el: any) => el.type))]
        let { tooltip: _tooltip, legend: _legend, label: _label, color: _color, zoom: _zoom, unit: _unit } = config
        options.tooltip = {
            show: typeof _tooltip == 'boolean' ? _tooltip : true,
            borderWidth: 0,
            trigger: (type.includes('bar') || type.includes('line')) ? 'axis' : 'item',
            axisPointer: {
                type: 'shadow'
            },
            confine: true,
            formatter: (params: any) => {
                let str = ''
                if (params?.length) {
                    params.map(((el: any, index: number) => {
                        if(el.seriesName) {
                            if (index == 0) {
                                str += `<div class="jw_chartName">${el.name}</div><div class="jw_chartDivider"></div>`
                            }
                            str += `
                                <div class="jw_chartCon">
                                    <span class="jw_chartSeriesName">
                                        ${_color ? `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${_color[index]};"></span>` : el.marker} 
                                        ${el.seriesName}:
                                    </span> 
                                    <span class="jw_chartValue">${el.value || '--'}</span>
                                    <span class="jw_chartUnit">${Array.isArray(_unit) ? (_unit[index] || '') : (_unit || '') }</span>
                                </div>
                                `
                        }
                    }))
                }

                return str
            }
        }

        options.legend = {
            show: typeof _legend == 'boolean' ? _legend : true,
        }

        if(_zoom) {
            options.dataZoom = [
                {
                    type: 'inside'
                },
                {
                    type: 'slider',
                    bottom: 0,
                    brushSelect: true
                }
            ]
        }

        if(_color?.length) {
            options.color = _color
        }

        if (legend?.length) {
            options.legend.data = legend
        }

        options.xAxis = [
            {
                data: xAxis || [],
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }
            }
        ]

        options.yAxis = []
        let yAxisIndex = [...new Set(series.map((el: any) => el.yAxisIndex || 0))]
        if(yAxisIndex.length == 1) {
            (extraOption as any).yAxis = [(extraOption as any).yAxis[0]]
        }
        yAxisIndex.map(() => {
            options.yAxis.push({
                name: '',
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }
            })
        })

        options.series = []

        series.map((el: any) => {
            let temp = merge({}, el, config[el.type] || {})
            /* let temp = {
                ...el,
                ...(config[el.type] || {})
            } */
            temp.label = {
                ...temp.label,
                show: typeof _label == 'boolean' ? _label : true,
                position: typeof _label == 'boolean' ? 'top' : _label
            }

            if(yAxisIndex.length > 1) {
                temp.max = (value: any) => {
                    if (Math.abs(value.max) > Math.abs(value.min)) {
                        return (Math.abs(value.max) * 1.2).toFixed(2)
                    } else {
                        return (Math.abs(value.min) * 1.2).toFixed(2)
                    }
                }
                temp.min = (value: any) => {
                    if (Math.abs(value.max) > Math.abs(value.min)) {
                        return (-Math.abs(value.max) * 1.2).toFixed(2)
                    } else {
                        return (-Math.abs(value.min) * 1.2).toFixed(2)
                    }
                }
            }

            options.series.push(temp)
        })

        return merge({}, options, extraOption)
    }
}

watch(
    [prop.options, prop.extraOption],
    ([options, extraOption]) => {
        if (options && Object.keys(options).length || extraOption && Object.keys(extraOption).length) {
            isEmpty.value = false
            methods.initOption()
        }
    },
    {
        immediate: true,
        deep: true
    }
)
</script>

<style lang="scss" scoped>
.el-empty {
    height: 100%;
}

.jw_chartName {
    .jw_chartDivider {
        border-bottom: 1px solid #5E6586; 
        margin: 6px 0;
    }
}

.jw_chartCon {
    color: #5085ea;
    font-size: 14px;

    .jw_chartSeriesName {}

    .jw_chartValue {
        font-size: 16px; 
        font-family: 'D-DIN'
    }

    .jw_chartUnit {
        font-size: 14px; 
        font-family: 'SourceHanSansSC'
    }
}
</style>