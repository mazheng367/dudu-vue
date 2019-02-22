import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import httpRequest from './utils/Request';

import {checkScreenZoom} from './utils/BrowserCheck';

import "./styles/common.scss";

Vue.config.productionTip = false;

Vue.use(ElementUI);

const eventHub = new Vue();

//注册全局守护导航
//加载完用户信息和菜单信息后，才继续执行页面
router.beforeEach((from, to, next) => {
    if (store.state.appUser) {
        onUserAuthed(next);
        return;
    }
    eventHub.$once("signedin", function () {
        onUserAuthed(next);
        eventHub.$destroy();
    });
});

function onUserAuthed(next: Function) {
    if (store.state.dataInited) {
        next();
        return;
    }
    loadDataAndMenu().then(() => next());
}

Vue.prototype.$http = httpRequest;

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        checkUserPermission.call(this);
    }
}).$mount('#app');

function checkUserPermission(this: Vue) {
    this.$http.queryData(`/api/user/UserInfo`, {"_": Math.random().toString().replace(/\D/g, '')}, 'GET').then(function (user: any) {
        store.commit("appUser", user);
        eventHub.$emit("signedin");//触发用户登录完成事件
        window.setInterval(function () {
            checkScreenZoom();
        }, 5000);
    }, () => (window as any).Auth.redirectToLogin());
}

function loadDataAndMenu() {
    return Promise.all([
        httpRequest.queryData("/api/menu/Menu", {}),
        httpRequest.queryData("/api/dd/Datadict", {})
    ]).then(([menuCache, dataDict]) => {
        store.commit("menuData", menuCache);
        store.commit("dataDict", dataDict);
        store.commit("dataInited", true);
    });
}