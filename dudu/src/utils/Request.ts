import axios from 'axios';
import startsWith from 'lodash/startsWith';
import {ActionContext, Store} from "vuex";
import Auth, {SERVER_HOST} from "@/utils/Auth";

class Request {
    async saveData(api: string, pars: object | null): Promise<any> {
        const savedUrl = Request.formatApiUrl(api, {});
        const postedParams = pars || {};
        return await Request.request(savedUrl, postedParams);
    }

    async query(api: string, pars: object | null, method = "POST") {
        const savedUrl = Request.formatApiUrl(api, {});
        const postedParams = pars || {};
        return await Request.request(savedUrl, postedParams, method);
    }

    private static async request(url: string, pars: object | null, method: string = "POST") {
        debugger;
        const resp = await axios({
            method: (method || "POST").toLowerCase(),
            url: url,
            data: pars || {},
            timeout: 1000000,
            headers: Auth.get()
        });
        if (resp.status === 200) {
            return resp.data;
        }
        throw resp;
    }

    static formatApiUrl(api: string, params: object | string | null) {
        if (startsWith(api, "/")) {
            api = api.substring(1);
        }
        let p;
        if (typeof params === "string") {
            p = params;
        } else if (typeof params === "object" && params !== null) {
            const arr = [];
            for (let prop in params) {
                if (!Object.prototype.hasOwnProperty.call(params, prop)) {
                    continue;
                }
                arr.push(`${prop}=${(params as any)[prop]}`);
            }
            p = arr.join("&");
        }
        return `${SERVER_HOST}/${api}${p ? "?" + p : ""}`;
    }
}

declare type VueRequestContext = Store<any> | ActionContext<any, any>;

export class VueRequest extends Request {
    private _store: VueRequestContext;

    constructor(store: VueRequestContext) {
        super();
        this._store = store;
    }

    async saveData(api: string, params: object) {
        try {
            this.showLoading();
            const data = await super.saveData(api, params);
            this.hideLoading();
            return data;
        } catch (e) {
            this.hideLoading();
            throw e;
        }
    }

    async queryData(api: string, params: object, method = "POST") {
        try {
            this.showLoading();
            const data = await super.query(api, params, method);
            this.hideLoading();
            return data;
        } catch (e) {
            this.hideLoading();
            throw e;
        }
    }

    private hideLoading() {
        this._store.commit("completedRequest");
    }

    private showLoading() {
        this._store.commit("startRequest");
    }
}