import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import {VueRequest} from './utils/Request';

import {checkScreenZoom} from './utils/BrowserCheck';

import "./styles/common.scss";

import {Store} from "vuex";
import isEmpty from "lodash/isEmpty";

import Auth from './utils/Auth';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(ElementUI);

const eventHub = new Vue();

let stateReady = false;

//注册全局守护导航
//加载完用户信息和菜单信息后，才继续执行页面
router.beforeEach((to, from, next) => {
    if (stateReady) {
        next();
    } else {
        eventHub.$once("allstateready", function () {
            stateReady = true;
            next();
            store.commit("currentView", to.fullPath);
            eventHub.$destroy();
        });
    }
});

Vue.prototype.$http = new VueRequest(store);

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        const me = this;
        //获取用户信息，加载必要数据
        initUserInfo(me.$store)
            .then(() => loadDataAndMenu())
            .then(({dataDict}) => ((window as any).eval(dataDict)))
            .then(() => eventHub.$emit("allstateready"))
            .then(() => me.$watch("routeView", me.onRouteChange));
    },
    methods: {
        onRouteChange(view: string) {
            if (isEmpty(view)) {
                return;
            }
            this.$router.push(view);
        }
    },
    computed: {
        routeView: function () {
            return this.$store.state.currentView;
        }
    }
}).$mount('#app');

function initUserInfo(store: Store<any>) {
    debugger;
    return store.dispatch("loadUserInfo").then(() => window.setInterval(() => checkScreenZoom(), 5000), () => Auth.redirectToLogin());
}

function loadDataAndMenu(): Promise<{ dataDict: any, menuData: any }> {
    return Promise.all([
        store.dispatch("loadDataDict"),
        store.dispatch("loadMenuData")
    ]).then(([dataDict, menuData]) => ({dataDict, menuData}));
}