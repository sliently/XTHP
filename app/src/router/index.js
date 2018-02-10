import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Login from '@/components/main/login'
import invite from '@/components/main/invite'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'main',
        component: Main,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/invite/:id',
        name: 'invite',
        component: invite
    }]
})