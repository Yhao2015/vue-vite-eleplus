let routeMap = reactive([
    {
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Index.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index/Index.vue'),
        // redirect: { name: 'monitor' },
        props: true,
        // alias: "/h",
        children: []
    },
    {
        path: '/403',
        name: '403',
        component: () => import('../views/errorPages/403.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/errorPages/404.vue')
    },
    {
        path: '/500',
        name: '500',
        component: () => import('../views/errorPages/500.vue')
    }
])

export {
    routeMap
}