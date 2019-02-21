import axios from 'axios';
import startsWith from 'lodash/startsWith';
import Vue from "vue";
import isEmpty from "lodash/isEmpty";

export class Request {

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
        const resp = await axios({
            method: (method || "POST").toLowerCase(),
            url: url,
            data: pars || {},
            timeout: 1000000,
            headers: (window as any).Auth.get()
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
        return `${(window as any).SERVER_HOST}/${api}${p ? "?" + p : ""}`;
    }
}

export class VueRequest extends Request {
    private _instance: Vue | null = null;

    private _counter = 0;

    set vueInstance(value: Vue) {
        this._instance = value;
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
        if (isEmpty(this._instance)) {
            return;
        }
        this._counter -= 1;
        if (this._counter > 0) {
            return;
        }
        (this._instance as Vue).$store.commit("showLoading", false);
    }

    private showLoading() {
        if (isEmpty(this._instance)) {
            return;
        }
        this._counter += 1;
        window.setTimeout(() => (this._instance as Vue).$store.commit("showLoading", true), 50);
    }
}