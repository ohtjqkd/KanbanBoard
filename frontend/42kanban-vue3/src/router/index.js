import { createWebHistory, createRouter } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index page',
        component: () => import('@/components/HelloWorld')
    },
    {
        path: '/login',
        name: 'Log In',
        component: () => import('@/components/Login')
    },
    {
        path: '/project/:projectName',
        name: 'Your Project',
        component: () => import('@/components/AppMain'),
        props: true
        // children: [
        //   {
        //     path: '/:projectName',
        //     name: 'Project',
        //     props: true
        //   }
        // ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})