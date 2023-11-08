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
        redirect: { name: 'form' },
        props: true,
        // alias: "/h",
        children: [
            {
                path: '/chart',
                name: 'chart',
                component: () => import('../views/Chart/Index.vue')
            },
            {
                path: '/form',
                name: 'form',
                component: () => import('../views/Form/Index.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('../views/Table/Index.vue')
            }
        ]
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