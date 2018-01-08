import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Login from '@/components/main/login'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/Login'
    }, {
        path: '/main',
        name: 'main',
        component: Main
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }]
})