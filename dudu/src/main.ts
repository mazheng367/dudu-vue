import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {VueRequest} from './utils/Request';

import {checkScreenZoom} from './utils/BrowserCheck';

import "./styles/common.scss";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$http = new VueRequest();

//注册全局守护导航
//加载完用户信息和菜单信息后，才继续执行页面
router.beforeEach((from, to, next) => {
    setTimeout(function () {
        next();
    }, 5000);
});

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        this.$http.vueInstance = this;
    },
    mounted() {
        checkUserPermission.call(this);
    }
}).$mount('#app');

function checkUserPermission(this: Vue) {
    this.$http.query(`/api/user/UserInfo`, {"_": Math.random().toString().replace(/\D/g, '')}, 'GET').then(function (user) {
        store.commit("setAppUser", user);
        //router.fireEvent('signedin', me, user);
        window.setInterval(function () {
            checkScreenZoom();
        }, 5000);
    }, () => (window as any).Auth.redirectToLogin());
}