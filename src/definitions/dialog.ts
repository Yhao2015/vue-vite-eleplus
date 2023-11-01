export interface dialogProp {
    visible: boolean,
    title ?: string,
    width ?: string | number,
    fullscreen ?: boolean,
    modal ?: boolean,
    'modal-class' ?: string,
    draggable ?: boolean,
    'align-center' ?: boolean,
    'destroy-on-close' ?: boolean,
    'z-index' ?: number,
    'show-close' ?: boolean,
    'custom-class' ?: string,
    extra ?: any,
    functions ?: any,
    type ?: string
    footer : boolean
}