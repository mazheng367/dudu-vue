import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Request from './common/Request';

Vue.config.productionTip = false;

Vue.prototype.$http = new Request();


Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        this.$http.saveData("/api/dd/Datadict", null).then(function () {
            console.log(arguments);
        });
    }
}).$mount('#app');