let DEV_ENV = true;

if (process.env.production) {
    DEV_ENV = false;
}
DEV_ENV = false;
/** DONT CHANGE THIS LINE! */
export const SERVER_HOST = DEV_ENV ? "http://127.0.0.1:9002" : "http://114.215.18.188:9006";
const SERVER_API = SERVER_HOST + "/api";
const HEADER_TENANT = "dudu-tenant";
const TOKEN_KEY = "dudu-token";
const LOGIN_FROM_CAS = "dudu-cas";
const ECHARTS_THEME = 'westeros';

class Auth {

    init(token: string, tenant: string, loginFromCAS: any) {
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem(HEADER_TENANT, tenant);
        window.localStorage.setItem(LOGIN_FROM_CAS, ((!!loginFromCAS) ? 1 : 0).toString());
    }

    isInited() {
        return this.getToken() !== "" && this.getTenant() > 0;
    }

    getToken() {
        return window.localStorage.getItem(TOKEN_KEY) || "";
    };

    getTenant() {
        return window.localStorage.getItem(HEADER_TENANT) || 0;
    };

    isLoginFromCAS() {
        return 1 == (window.localStorage.getItem(LOGIN_FROM_CAS) || 0);
    };

    get() {
        return {
            "dudu-token": this.getToken(),
            "dudu-tenant": this.getTenant()
        };
    };

    clear() {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(HEADER_TENANT);
    };

    redirectToIndex() {
        window.location.href = '/';
    };

    redirectToLogin() {
        let url = 'login.html';
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
}

export const LOGIN_API = `${SERVER_API}/user/Login`;
export default new Auth();