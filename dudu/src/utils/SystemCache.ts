import {VueRequest} from "@/utils/Request";
import {isValidID} from "@/utils/Common";
import {getObject} from "@/utils/DataDict";
import cloneDeep from "lodash/cloneDeep";
import {SearchCondition} from "@/utils/SearchCondition";
import {MAX_DISP_NUMS} from "@/utils/Constants";
import {isEmpty} from "lodash-es";

class SystemCache {

    private localData: { [key: string]: any } = {};
    private request: VueRequest;

    constructor(request: VueRequest) {
        this.request = request;
    }

    getListLayout(objectType: number, typeId: number = 0) {
        return this.queryLayout("list", objectType, typeId, "{}");
    }

    removeListLayout(objectType: number, typeId: number = 0) {
        const dataKey = this.getLayoutCacheKey("list", objectType, typeId);
        return delete this.localData[dataKey];
    }

    getViewLayout(objectType: number, typeId: number = 0) {
        return this.queryLayout("view", objectType, typeId);
    }


    getEditLayout(objectType: number, typeId: number = 0) {
        return this.queryLayout("edit", objectType, typeId);
    }


    getCondLayout(objectType: number, typeId: number = 0) {
        return this.queryLayout("cond", objectType, typeId, {}).then(data => data.condAttrs || []);
    }


    removeCondLayoutCache(objectType: number, typeId: number = 0) {
        const dataKey = this.getLayoutCacheKey("cond", objectType, typeId);
        return delete this.localData[dataKey];
    }


    async queryLayout(mode: string, objType: number = 0, typeId: number = 0, defaultValue: any = []) {
        if (!defaultValue) {
            defaultValue = [];
        }
        let api = "";
        if (mode === "edit") {
            api = "/api/base/EditLayoutQuery";
        } else if (mode === "view") {
            api = "/api/base/ViewLayoutQuery";
        } else if (mode === "cond") {
            api = "/api/base/CondLayoutQuery";
        } else if (mode === "list") {
            api = "/api/base/ListLayoutQuery";
        } else {
            return defaultValue;
        }
        if (!isValidID(objType)) {
            objType = 0;
        }
        if (!isValidID(typeId)) {
            typeId = 0;
        }
        const cacheKey = this.getLayoutCacheKey(mode, objType, typeId);
        return await this.getApiData(api, {objType: objType, typeId: typeId}, cacheKey, defaultValue);
    }


    getLayoutCacheKey(layoutType: string, objectType: number, typeId: number) {
        return `__${layoutType.toUpperCase()}LAYOUT__${objectType}_${typeId}__`;
    }

    async getCondAttrs(objectType: number) {
        let taskList = [];

        taskList.push(this.getAttributes(objectType, "Cond"));
        taskList.push(this.getAttributes(objectType, "AppendCond"));
        const [condAttrs, appendAttrs] = await Promise.all(taskList);
        return {condAttrs, appendAttrs};
    }


    getAttributes(objectType: number, actionType: string) {
        const cacheKey = `__ATTRS_${objectType}_${actionType.toUpperCase()}__`;
        return this.getApiData("/api/base/GetAttributes", {objType: objectType, actionType: actionType}, cacheKey, []);
    }


    getMySearchFilters(objectType: number, typeId: number) {
        typeId = 0;
        const cacheKey = `__MYSEARCHFILTERS_${objectType}_${typeId}__`,
            postedParams = {objType: objectType, typeID: typeId};
        return this.getApiData("/api/base/SearchAsList", postedParams, cacheKey, []);
    }


    getObjectTypes(objectType: number) {
        const cacheKey = `__OBJTYPEKEYS_${objectType || 0}__`;
        return this.getApiData("/api/base/GetObjectTypes", {objType: objectType}, cacheKey, null);
    }

    async getApiData(api: string, postedParams: any, cacheKey: string, defaltValue?: any) {
        const me = this;
        let task,
            attrKey = cacheKey,
            dataItems = this.localData[attrKey];

        if (!dataItems) {
            task = this.request.queryData(api, postedParams);
        } else {
            task = Promise.resolve(dataItems);
        }

        const data = await task;
        me.localData[attrKey] = data || defaltValue;
        return cloneDeep(me.localData[attrKey]);
    }

    setCacheItem(key: string, value: any) {
        let cache = this.localData["__NORMALCACHE__"];
        if (!cache) {
            cache = this.localData["__NORMALCACHE__"] = {};
        }
        if (cache.hasOwnProperty(key)) {
            return false;
        }
        cache[key] = value;
    }

    getCacheItem(key: string) {
        let cache = this.localData["__NORMALCACHE__"];
        if (!cache) {
            return;
        }
        return cache[key];
    }

    removeCache(key: string) {
        if (isEmpty(key)) {
            return true;
        }
        return delete this.localData[key];
    }
}