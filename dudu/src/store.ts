import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        appUser: null
    },
    mutations: {
        showLoading(state, show) {
            if (show === null || show === undefined) {
                show = false;
            }
            state.loading = show;
        },
        setAppUser(state, user) {
            state.appUser = user;
        }
    },
    actions: {

    }
})
