import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        appUser: null,
        menuData: null,
        dataDict: null,
        dataInited: false
    },
    mutations: {
        showLoading(state, show) {
            if (show === null || show === undefined) {
                show = false;
            }
            state.loading = show;
        },
        appUser(state, user) {
            state.appUser = user;
        },
        menuData(state, menu) {
            state.menuData = menu;
        },
        dataDict(state, data) {
            state.dataDict = data;
        },
        dataInited(state) {
            state.dataInited = true;
        }
    }
})
