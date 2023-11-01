export const base_options = {
    xAxis: [],
    yAxis: [],
    legend: [],
    unit: [],
    config: {
        label: false,
        tooltip: false,
        legend: false,
        zoom: false,
        line: {
            // symbol: 'none',
            showSymbol: false,
            symbolSize: 8,
            smooth: true,
            lineStyle: {
                width: 2
            }
        },
        bar: {
            barWidth: 12
        }
    }
}

export const base_extraOption = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '15%'
    },
    xAxis: [
        {
            axisLabel: {
                color: '#999999',
                fontFamily: 'D-DIN'
            }
        }
    ],
    yAxis: [
        {
            name: '',
            nameTextStyle: {
                align: 'right',
                padding: [0, 6, 0, 0],
                color: '#999999',
                fontFamily: 'SourceHanSansSC'
            },
            axisLabel: {
                color: '#999999',
                fontFamily: 'D-DIN'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    type: 'dashed'
                }
            }
        },
        {
            name: '',
            nameTextStyle: {
                align: 'left',
                padding: [0, 0, 0, 6],
                color: '#999999',
                fontFamily: 'SourceHanSansSC'
            },
            axisLabel: {
                color: '#999999',
                fontFamily: 'D-DIN'
            },
            splitLine: {
                show: false,
                /* lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    type: 'dashed'
                } */
            }
        }
    ],
    legend: {
        right: 0,
        itemWidth: 16,
        itemHeight: 6
    }
}