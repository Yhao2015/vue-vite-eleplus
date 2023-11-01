
declare module 'qs';
declare module 'lodash';
declare module 'nprogress';
declare module 'jw-component-library';

// 国际化声明
declare module 'element-plus/dist/locale/*.mjs'

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}