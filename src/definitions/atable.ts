export interface paginationProp {
	currentPage?: number,
	pageSize?: number,
	background?: boolean,
	total ?: number
    layout ?: string
}

export interface table_column {
    title ?: string,
    dataIndex ?: string,
    width ?: string | number,
    fixed ?: boolean | 'left' | 'right',
    sortable ?: boolean,
    resizable ?: boolean,
    align ?: 'left' | 'center' | 'right',
    'class-name'?: string,
    scopedSlots ?: boolean | string
}

export interface columnProp {
    loading: boolean
    // tableData: Array<any>,
    height ?: string | number | null,
    'max-height' ?: string | number | null,
    stripe ?: boolean,
    border ?: boolean,
    size ?: 'large' | 'default' | 'small',
    'show-header' ?: boolean,
    'highlight-current-row' ?: boolean,
    'current-row-key' ?: string | number,
    'row-class-name' ?: string | Function,
    'row-style' ?: object | Function,
    'cell-class-name' ?: string | Function,
    'cell-style' ?: object | Function,
    'header-row-class-name' ?: string | Function,
    'header-row-style' ?: object | Function,
    'header-cell-class-name' ?: string | Function,
    'header-cell-style' ?: object | Function,
    'row-key' ?: string | Function,
    'empty-text' ?: string,
    'show-summary' ?: boolean,
    'sum-text' ?: string,
    'summary-method' ?: Function,
    'span-method' ?: Function,
    'table-layout' ?: 'fixed' | 'auto',
    'show-overflow-tooltip' ?: boolean,
    extra ?: any,
    type ?: 'radio' | 'checkBox',
    index ?: boolean,
    // columns: Array<table_column>,
    pagination ?: boolean,
    currentPage ?: number,
	pageSize ?: number,
	background ?: boolean,
	total ?: number,
    layout ?: string
    functions ?: any
    paginationClassName?: string
}