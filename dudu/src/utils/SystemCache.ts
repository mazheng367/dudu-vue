import {VueRequest} from "@/utils/Request";
import {isValidID} from "@/utils/Common";
import {getObject} from "@/utils/DataDict";
import cloneDeep from "lodash/cloneDeep";

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


    async getPatentState() {
        const ot = "__DUDU_PATENTSTATE__";
        if (this.localData[ot]) {
            return cloneDeep(this.localData[ot]);
        }
        const me = this,
            obj = getObject("TSStatus"),
            condObj = Ext.create("Dudu.util.SearchCondition"),
            postedParams = {
                start: 0,
                limit: Dudu.constant.Constants.MAX_DISP_NUMS,
                objType: obj.ObjType,
                condObj: "",
                page: 1
            };
        condObj.setName("TSStatus");
        postedParams.condObj = condObj.stringify();
        return new Ext.Promise(function (resolve) {
            Dudu.util.Request.post(Dudu.util.ServerParams.formatApiUrl("/api/base/BaseList", {}), postedParams, function (res) {
                const data = [];
                if (res.size > 0) {
                    Ext.Array.forEach(res.rows, function (item) {
                        data.push({name: item.Name, code: item.IdentifyCode});
                    });
                    me.setListLayout(ot, data);
                }
                resolve(Ext.JSON.decode(Ext.JSON.encode(data)));
            }, function () {
                resolve(Ext.JSON.encode({}));
            });
        });
    }


    getCondAttrs(objectType) {
        let taskList = [];

        taskList.push(this.getAttributes(objectType, "Cond"));
        taskList.push(this.getAttributes(objectType, "AppendCond"));
        return Ext.Promise.all(taskList).then(args => {
            return {condAttrs: args[0], appendAttrs: args[1]};
        });
    }


    getAttributes(objectType, actionType) {
        const cacheKey = `__ATTRS_${objectType}_${actionType.toUpperCase()}__`;
        return this.getApiData("/api/base/GetAttributes", {objType: objectType, actionType: actionType}, cacheKey, []);
    }


    getMySearchFilters(objectType, typeId) {
        typeId = 0;
        const cacheKey = `__MYSEARCHFILTERS_${objectType}_${typeId}__`,
            postedParams = {objType: objectType, typeID: typeId};
        return this.getApiData("/api/base/SearchAsList", postedParams, cacheKey, []);
    }


    getObjectTypes(objectType) {
        const cacheKey = `__OBJTYPEKEYS_${objectType || 0}__`;
        return this.getApiData("/api/base/GetObjectTypes", {objType: objectType}, cacheKey, null);
    }


    getEmailSignatureAsync() {
        const formatter = function (content) {
            if (Dudu.util.Common.isBlank(content)) {
                return "";
            }
            return `<br/><br/>-------------------------------<br/>${content}`
        };

        let content = Dudu.util.Cache.getCacheItem("EmailSign");
        if (!Dudu.util.Common.isNull(content)) {
            return Ext.Promise.resolve(formatter(content));
        }
        return Dudu.util.Request.query("/api/mail/EmailServerQuery", {}, false, true).then((data) => {
            Dudu.util.Cache.setCacheItem("EmailSign", data.SignContent || "");
            return formatter(data.SignContent);
        });
    }

    getApiData(api, postedParams, cacheKey, defaltValue) {
        const me = this;
        let task,
            attrKey = cacheKey,
            dataItems = this.localData[attrKey];

        if (!dataItems) {
            task = Dudu.util.Request.query(api, postedParams, false, true);
        } else {
            task = Ext.Promise.resolve(dataItems);
        }

        return task.then(function (data) {
            me.localData[attrKey] = data || defaltValue;
            return cloneDeep(me.localData[attrKey]);
        });
    }

    setCacheItem(key, value) {
        let cache = this.localData["__NORMALCACHE__"];
        if (!cache) {
            cache = this.localData["__NORMALCACHE__"] = {};
        }
        if (cache.hasOwnProperty(key)) {
            return false;
        }
        cache[key] = value;
    }

    getCacheItem(key) {
        let cache = this.localData["__NORMALCACHE__"];
        if (!cache) {
            return;
        }
        return cache[key];
    }

    removeCache(key) {
        if (Dudu.util.Common.isBlank(key)) {
            return true;
        }
        return delete this.localData[key];
    }
}