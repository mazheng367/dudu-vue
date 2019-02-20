window.DEV_ENV = true; /** DONT CHANGE THIS LINE! */
var SERVER_HOST = DEV_ENV ? "http://127.0.0.1:9002" : "http://114.215.18.188:9006";
var SERVER_API = SERVER_HOST + "/api";
var LOGIN_API = SERVER_API + "/user/Login";
var HEADER_TENANT = "dudu-tenant";
var TOKEN_KEY = "dudu-token";
var LOGIN_FROM_CAS = "dudu-cas";
var ECHARTS_THEME = 'westeros';
var Auth = {};
Auth.init = function (token, tenant, loginFromCAS) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(HEADER_TENANT, tenant);
    window.localStorage.setItem(LOGIN_FROM_CAS, !!loginFromCAS ? 1 : 0);
};

Auth.isInited = function () {
    return this.getToken() !== "" && this.getTenant() > 0;
};

Auth.getToken = function () {
    return window.localStorage.getItem(TOKEN_KEY) || "";
};

Auth.getTenant = function () {
    return window.localStorage.getItem(HEADER_TENANT) || 0;
};

Auth.isLoginFromCAS = function () {
    return 1 == (window.localStorage.getItem(LOGIN_FROM_CAS) || 0);
};

Auth.get = function () {
    return {
        "dudu-token": this.getToken(),
        "dudu-tenant": this.getTenant()
    };
};

Auth.clear = function () {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(HEADER_TENANT);
};

Auth.redirectToIndex = function () {
    window.location.href = '/';
};

Auth.redirectToLogin = function () {
    var url = 'login.html';
    if (this.isLoginFromCAS()) {
        this.clear();
        window.localStorage.removeItem(LOGIN_FROM_CAS);
        url = 'http://tpr.hnipo.net/cas/logout?service=http%3a%2f%2ftpr.hnipo.net%2ff';
    }
    if (window.top) {
        window.top.location.href = url;
        return;
    }
    window.location.href = url;
};
