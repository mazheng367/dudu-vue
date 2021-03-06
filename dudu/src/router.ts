import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:view',
            name: 'main',
            component: () => import(/* webpackChunkName: "about" */ './views/CompnentContainer.vue')
        },
        {
            path: '*',
            name: 'error',
            component: () => import(/* webpackChunkName: "about" */ './views/Error.vue')
        }
    ]
})
