import axios from 'axios';
import startsWith from 'lodash/startsWith';

export default class Request {

    // noinspection JSMethodCanBeStatic
    async saveData(api: string, pars: object | null): Promise<any> {
        const savedUrl = Request.formatApiUrl(api, {});
        const postedParams = pars || {};
        return await Request.request(savedUrl, postedParams);
    }

    // noinspection JSMethodCanBeStatic
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