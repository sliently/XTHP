// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex 状态管理
import store from './store/store'
// axios
import axios from 'axios'
// 引入框架
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
Vue.config.productionTip = false
    // socket插件引入
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, '/', store);
// cookie插件引入
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (VueCookies.get('user') !== null) { // 通过vuex state获取当前的token是否存在
                next();
            } else {
                next({
                    path: '/Login'
                        // query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            next();
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})