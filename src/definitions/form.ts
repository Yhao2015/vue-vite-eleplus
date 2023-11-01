export interface dataProp {
    type: string // 类型
    show: boolean // 显示 隐藏
    code: string // 唯一code
    required?: boolean //必填校验
    placeholder?: string //占位
    label?: string // 标签名
    grid ?: number | Array<number> // 响应式布局
    // labelCol?: null | { span: number }
    // wrapperCol?: null | { span: number }
    'label-width' ?: string | number
    defaultValue?: any
    clearable?: boolean
    disabled?: boolean
    dataFormat?: Array<any>
    fieldName?: any
    // isFull?: boolean
    slot?: string
    multiple ?: boolean  // select 多选
    'show-checkbox' ?: boolean // trueSelect
    trigger?: string | string[]
    pattern?: string // 正则
    help?: string // 错误提示信息
    accept ?: any
    limit ?: number
    action ?: string
    extra?: any
    checkFunName?: string | null //自定义校验
    formClassName ?: string
    changeFunName?: Function
    blurFunName?: Function 
    focusFunName?: Function
}

export interface baseProp {
    inline ?: boolean
    'label-position'?: 'left' | 'right' | 'top'
    'label-width' ?: string | number
    'label-suffix' ?: string
    'hide-required-asterisk' ?: boolean
    'require-asterisk-position' ?: 'left' | 'right'
    'inline-message' ?: boolean
    'status-icon' ?: boolean
    gutter ?: number | Array<number>
    grid ?: any // 响应式布局
    justify ?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
    'item-bottom' ?: String
}

export interface formConfigProp {
    formConfigData?: dataProp[],
    formConfigBase?: baseProp,
    functions: any
}

