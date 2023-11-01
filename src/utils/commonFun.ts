export function dateFormat(date = new Date(), fmt = 'YYYY-MM-DD hh:mm:ss') {
    let ret
    const opt: { [x: string]: string } = {
        'Y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'D+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
        }
    }
    return fmt
}

export function getParamsKey(str: string, key: string) {
    let result: { [x: string]: string } = {}
    if (str.includes('?')) {
        var strParams = str.split('?')[1]
        var arrParams = strParams.split('&')
        arrParams.forEach((item: string) => {
            let temKey = item.split('=')[0]
            let temVal = item.split('=')[1]
            result[temKey] = temVal
        })
    }
    return result[key]
}

export function changeUnit(value: number|string, type: string) {
    let unit = ''

    let unitFun: any = {
        千克: () => {
            unit = '千克'
            value = +value
            if (value > 1000) {
                unit = '吨'
                value = value / 1000
            }
            if (value > 10000) {
                unit = '万吨'
                value = value / 10000
            }
            value = value.toFixed(2)
        },
        棵: () => {
            unit = '棵'
            value = +value
            if (value > 10000) {
                value = value / 10000
                unit = '万棵'
                value = value.toFixed(1)
            }
        },
        kWh: () => {
            unit = 'kWh'
            value = +value
            if (value > 10000) {
                value = value / 10000
                unit = '万kWh'
            }
            if (value > 10000) {
                value = value / 10000
                unit = '亿kWh'
            }
            value = value.toFixed(2)
        },
        kWp: () => {
            unit = 'kWp'
            value = +value
            if (value > 1000) {
                value = value / 1000
                unit = 'MWp'
            }
            value = value.toFixed(2)
        },
        吨: () => {
            unit = '吨'
            value = +value
            if (value > 10000) {
                value = value / 10000
                unit = '万吨'
            }
            value = value.toFixed(2)
        },
        'm³': () => {
            unit = 'm³'
            value = +value
            if (value > 10000) {
                value = value / 10000
                unit = '万m³'
            }
            value = value.toFixed(2)
        },
        元: () => {
            unit = '元'
            value = +value
            if (value > 10000) {
                value = (value / 10000).toFixed(2)
                unit = '万元'
            }
        },
        '%': () => {
            unit = '%'
            value = +value
        }
    }

    unitFun[type] ? unitFun[type]() : (unit = type)

    return { value, unit }
}
