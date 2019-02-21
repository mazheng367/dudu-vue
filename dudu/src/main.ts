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
    });
});

function onUserAuthed(next: Function) {
    console.log(store);
    if (store.state.dataInited) {
        next();
        return;
    }

    Promise.all([
        router.app.$http.queryData("/api/menu/Menu", {}),
        router.app.$http.queryData("/api/dd/Datadict", {})
    ]).then(([menuCache, dataDict]) => {
        store.commit("menuData", menuCache);
        store.commit("dataDict", dataDict);
        store.commit("dataInited", true);
        eventHub.$destroy();
        next();
    });
}

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
    this.$http.queryData(`/api/user/UserInfo`, {"_": Math.random().toString().replace(/\D/g, '')}, 'GET').then(function (user) {
        store.commit("appUser", user);
        eventHub.$emit("signedin");//触发用户登录完成事件
        window.setInterval(function () {
            checkScreenZoom();
        }, 5000);
    }, () => (window as any).Auth.redirectToLogin());
}