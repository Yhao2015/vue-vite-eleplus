import { mapState, useStore } from 'vuex'
export const useMapState = (getKeys: any) => {

    const store = useStore();
    
    const storeState: any = {}
    const storeFns = mapState(getKeys)

    Object.keys(storeFns).forEach((fnKeys) => {
        const fn = storeFns[fnKeys].bind({$store: store})
        storeState[fnKeys] = computed(fn)
    })

    return storeState
}