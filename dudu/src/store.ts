import Vue from 'vue';
import Vuex from 'vuex';
import {VueRequest} from "./utils/Request";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        appUser: null,
        menuData: null,
        subMenu: null,
        dataDict: null,
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
        subMenu(state, subs) {
            state.subMenu = JSON.parse(JSON.stringify(subs));
        }
    },
    actions: {
        setSubMenu(context, data) {
            context.commit("subMenu", data);
        },
        loadUserInfo(context) {
            return new VueRequest(context).queryData(`/api/user/UserInfo`, {"_": Math.random().toString().replace(/\D/g, '')}, 'GET').then(function (user: any) {
                context.commit("appUser", user);
            });
        },
        loadDataDict(context) {
            return new VueRequest(context).queryData("/api/dd/Datadict", {}).then((dataDict) => {
                context.commit("dataDict", dataDict);
                return dataDict;
            });
        },
        loadMenuData(context) {
            return new VueRequest(context).queryData("/api/menu/Menu", {}).then(menuData => {
                context.commit("menuData", menuData);
                return menuData;
            });
        }
    }
})
