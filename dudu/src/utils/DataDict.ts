import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

import * as Constants from './Constants';
import {Bo, FieldAttr, Nullable} from "@/types/dudu";

export function isRestrictAttr(ddo: any, usertype: string): boolean {
    if (!isObject || ddo.IsFieldControl != 1)
        return false;
    const control = (window as any).ATTR_CONTROLS[ddo.Name];
    let view = 0;
    let edit = 0;
    if (!isEmpty(control)) {
        switch (usertype) {
            case "OWNER":
                view = (control.substr(Constants.ATTR_OWNER_NOT_VIEW, 1) == "1") ? 1 : 0;
                edit = (control.substr(Constants.ATTR_OWNER_NOT_EDIT, 1) == "1") ? 2 : 0;
                break;
            case "REL":
                view = (control.substr(Constants.ATTR_REL_NOT_VIEW, 1) == "1") ? 1 : 0;
                edit = (control.substr(Constants.ATTR_REL_NOT_EDIT, 1) == "1") ? 2 : 0;
                break;
            //case "":
            case "OTHER":
                view = (control.substr(Constants.ATTR_OTHER_NOT_VIEW, 1) == "1") ? 1 : 0;
                edit = (control.substr(Constants.ATTR_OTHER_NOT_EDIT, 1) == "1") ? 2 : 0;
                break;
        }
    }
    return !!(view | edit);
}

export function getObjectMaps(fromObjType: string, toObjType: string, attr: number): Array<Bo> {
    attr = attr || 0;
    let maps = (window as any).OBJECT_MAPS[fromObjType];
    if (maps)
        maps = maps[toObjType];
    else
        return [];
    if (!maps) return [];
    if (maps[attr])
        return maps[attr];
    return [];
}


export function getObjectTypeByName(name: string): number {
    const obj = getObject(name);
    if (obj != null) {
        return obj.ObjType;
    }
    return -1;
}


export function getObjTypesBySubType(stype: number): Array<number> {
    const sname = getObjectNameByType(stype);
    if (!sname) return [];
    const types = [];

    let i = 0;
    const len = (<any>window).TDD_DD_PACKAGE[0].length;
    for (; i < len; i++) {
        const o = (<any>window).TDD_DD_PACKAGE[0][i];
        const arr = o.DetailObjectName.split(",");
        let k = 0;
        const alen = arr.length;
        for (; k < alen; k++) {
            if (sname == arr[k]) {
                types.push(o.ObjType);
                break;
            }
        }
    }
    return types;
}

export function getObjectListURL(name: string): string {
    const tp = getObjectTypeByName(name);
    return getObjectListURLByType(tp);
}


export function getObjectListURLByType(tp: number): string {
    const arr = toArray((<any>window).OBJECT_INFOS.listUrls);
    return arr[tp] as string;
}

export function getObjectViewURL(name: string): string {
    const tp = getObjectTypeByName(name);
    return getObjectViewURLByType(tp);
}

export function getObjectViewURLByType(tp: number): string {
    const arr = toArray<string>((<any>window).OBJECT_INFOS.viewUrls);
    let res = arr[tp];
    if (!res) {
        res = arr[0];
    }
    return res;
}

export function getObjectEditURL(name: string): string {
    const tp = getObjectTypeByName(name);
    return getObjectEditURLByType(tp);
}


export function getObjectEditURLByType(tp: number): string {
    const arr = toArray<string>((<any>window).OBJECT_INFOS.editUrls);
    return arr[tp];
}

export function getObjectImageByType(tp: number) {
    const arr = toArray((<any>window).OBJECT_INFOS.objImages);
    return arr[tp];
}

export function getObjectNewImageByType(tp: number) {
    const arr = toArray((<any>window).OBJECT_INFOS.newImages);
    return arr[tp];
}

export function getObjectNewLabelByType(tp: number) {
    const arr = toArray<string>((<any>window).OBJECT_INFOS.newLabels);
    return getStringRes(arr[tp]);
}


export function getPrivilegeValueArr(ptype: any) {
    /*if (!ptype)
        return PRIVILEGE_TREE_INFOS;
    else {
        for (var i = 0, len = PRIVILEGE_TREE_INFOS.length; i < len; i++) {
            if (PRIVILEGE_TREE_INFOS[i].PrivilegeType == ptype)
                return PRIVILEGE_TREE_INFOS[i];
        }
    }*/
    // TODO
    return false;
}


export function getAllString(res: string) {
    const str = getStringRes(res);
    if (str != "")
        return str;
    if (res.indexOf(".") > -1)
        return getLabel(res);

    const objDef = getObject(res);
    if (isObject(objDef))
        return objDef.Label;
    return res;
}


export function getStringRes(res: string) {
    if ((<any>window).TDD_RES_PACKAGE && isArray((<any>window).TDD_RES_PACKAGE[res])) {
        return (<any>window).TDD_RES_PACKAGE[res][0];
    }
    return "";
}


export function getStringDesc(res: string) {
    if ((<any>window).TDD_RES_PACKAGE)
        if (isArray((<any>window).TDD_RES_PACKAGE[res])) {
            if (isEmpty((<any>window).TDD_RES_PACKAGE[res][1]))
                return (<any>window).TDD_RES_PACKAGE[res][0];
            else
                return (<any>window).TDD_RES_PACKAGE[res][1];
        }
    return "";
}


/**
 * get attribute by object name
 * return the attribute objects array of object
 */
export function getAttrsByObjectName(name: string) {
    const arr = (<any>window).TDD_DD_PACKAGE[5][name];
    const ret = [];
    if (isArray(arr)) {
        let i = 0;
        const len = arr.length;
        for (; i < len; i++) {
            ret.push(getDDO(arr[i]) as FieldAttr);
        }
    }
    ret.sort((a, b) => a.DispOrder - b.DispOrder);
    return ret;
}


/**
 * get data object def by name
 */
export function getObject(name: string) {
    const idx = (<any>window).TDD_DD_PACKAGE[2][name];
    if (!isEmpty(idx))
        return (<any>window).TDD_DD_PACKAGE[0][idx];
    return null;
}


/**
 * get data object name attribute name by type
 */
export function getNameAttrName(tp: number) {
    const obj = getObjectByType(tp);
    if (obj == null) {
        return "";
    }
    if (isEmpty(obj.NameAttrName)) {
        return "";
    }
    return obj.NameAttrName
}


/**
 * get data object def by type
 */
export function getObjectByType(tp: number): Nullable<Bo> {
    const idx = (<any>window).TDD_DD_PACKAGE[3][tp];
    if (!isEmpty(idx))
        return (<any>window).TDD_DD_PACKAGE[0][idx];
    return null;
}


/**
 * get data object name by type
 * @return string
 * @param tp
 */
export function getObjectNameByType(tp: number): string {
    const obj = getObjectByType(tp);
    if (isObject(obj))
        return (<Bo>obj).Name;
    return "";
}


/**
 * return attribute dataobject by path, eg. Order.Cust.CreateBy.Name
 * will return dd with name "User.Name"
 */
export function getDDO(path: string): Nullable<FieldAttr> {
    path += "";
    const parts = path.split(".");
    if (parts.length < 3)
        return getDirectDDO(path);

    let newName = parts[0] + "." + parts[1];
    const ddo = getDDO(newName);
    if (ddo) {
        newName = ddo.ReferBoName + path.substr(newName.length);
        return getDDO(newName);
    } else {
        return ddo;
    }
}


/**
 * return attribute dataobject witch name equal dd name accurately
 */
export function getDirectDDO(name: string): Nullable<FieldAttr> {
    const idx = (<any>window).TDD_DD_PACKAGE[4][name];
    return (<any>window).TDD_DD_PACKAGE[1][idx];
}


/**
 * get label of name object
 * if name stand for a reference object attribute, then
 * label is a compose string sperated by ":", for example:Cust.CreateBy.Name
 *    = Cust.CreateBy+":"+Emp.Name, "Emp" is the ReferBoName of Cust.CreateBy
 */
export function getLabel(name: string): string {
    const parts = name.split(".");
    let ddo;
    if (parts.length <= 2) {
        let ddo = getDirectDDO(name);
        if (ddo)
            return ddo.Label;
        else
            return "--";
    } else {
        let newName = parts[0] + "." + parts[1];
        ddo = getDirectDDO(newName);
        if (ddo) {
            newName = ddo.ReferBoName + name.substr(newName.length);
            return ddo.Label + ": " + getLabel(newName);
        } else {
            return "--";
        }
    }
}


/**
 * get attribute align string defined in dd
 */
export function getAlign(name: string): string {
    let align = "start";
    const ddo = getDDO(name);
    if (ddo) {
        switch (ddo.Align * 1) {
            case 1:
                align = "center";
                break;
            case 2:
                align = "end";
                break;
        }
    }
    return align;
}


/**
 * get attribute nowrap string defined in dd
 */
export function getWrap(name: string) {
    const ddo = getDDO(name);
    if (ddo && ddo.IsNoWrap)
        return "NOWRAP";
    return "";
}


export function toArray<T>(obj: any) {
    const ret: Array<T> = [];
    if (typeof (obj) !== "object") return ret;
    for (let k in obj) {
        (<any>ret)[k] = obj[k];
    }
    return ret;
}


export function inArray(val: any, obj: any) {
    if (typeof (obj) !== "object") return false;
    for (let k in obj) {
        if (obj[k] == val) {
            return true;
        }
    }
    return false;
}


/**
 * get enum idx by enum name
 */
export function getEnumIndex(name: string) {
    if (isEmpty((<any>window).TDD_ENUM_PACKAGE)) {
        return null;
    }
    return (<any>window).TDD_ENUM_PACKAGE[2][name];
}


/**
 * get enum name by enum idx
 */
export function getEnumName(idx: any) {
    return (<any>window).TDD_ENUM_PACKAGE[3][idx];
}


/**
 * get enum value array by name
 * insertBlank: insert a blank value  (default false)
 */
export function getEnumArray(name: string, insertBlank: boolean) {
    insertBlank = insertBlank || false;
    const ddo = getDDO(name); //get actual name by ddo
    const ret = [];
    if (insertBlank)
        ret[0] = "";
    if (ddo) {
        const idx = getEnumIndex(ddo.Name);
        if (!isEmpty(idx)) {
            return ret.concat(toArray((<any>window).TDD_ENUM_PACKAGE[0][idx]));
        }
    }
    return ret;
}


/**
 * get enum value by enum key
 * name: attribute name
 */
export function getEnumValue(name: string, key: string) {
    const ddo = getDDO(name); //get actual name by ddo
    if (ddo) {
        const idx = getEnumIndex(ddo.Name);
        if (!isEmpty(idx)) {
            if (typeof ((<any>window).TDD_ENUM_PACKAGE[0][idx]) == "object" && !isEmpty((<any>window).TDD_ENUM_PACKAGE[0][idx][key]))
                return (<any>window).TDD_ENUM_PACKAGE[0][idx][key];
        }
    }
    return "";
}


/**
 * get parent enum attribute
 */
export function getEnumParentName(name: string) {
    const idx = getEnumIndex(name);
    if (!isEmpty(idx)) {
        return getEnumName((<any>window).TDD_ENUM_PACKAGE[1][1][idx]);
    }
    return null;
}


/**
 * get enum array by parent attribute value
 * name: this enum attribute name
 * pkey: parent enum key
 * insertBlank: insert a blank value  (default false)
 */
export function getEnumArrayByValue(name: string, pkey: string, insertBlank: boolean) {
    const idx = getEnumIndex(name);
    const ret = [];
    if (insertBlank)
        ret[0] = "";
    if (!isEmpty(idx)) {
        const pidx = (<any>window).TDD_ENUM_PACKAGE[1][1][idx];
        if (!isEmpty(pidx)) {
            const arr = toArray((<any>window).TDD_ENUM_PACKAGE[0][idx]);//all attr
            const arr1 = toArray((<any>window).TDD_ENUM_PACKAGE[1][0][pidx][idx][pkey]);//none related attr
            const arr2 = toArray((<any>window).TDD_ENUM_PACKAGE[1][0][pidx][idx][0]); //related attr
            const arr3: Array<any> = [];
            for (let k = 0; k < arr1.length; k++) {
                (arr3 as any)[(arr1 as any)[k]] = 1;
            }
            for (let k = 0; k < arr2.length; k++) {
                (arr3 as any)[(arr2 as any)[k]] = 1;
            }
            for (let k in arr) {
                if (arr3[k]) {
                    (ret as any)[k] = arr[k];
                }
            }
        }
    }
    return ret;
}


/**
 * get relation enum attribute array by parent attribute name
 * pname: parent enum attribute name
 */
export function getRelatedEnumsByParent(name: string) {
    const ret = [];
    const pidx = getEnumIndex(name);
    if (!isEmpty(pidx) && !isEmpty((<any>window).TDD_ENUM_PACKAGE[1][0][pidx])) {
        for (let k in (<any>window).TDD_ENUM_PACKAGE[1][0][pidx]) {
            const ename = getEnumName(k);
            if (typeof ename == "string") {
                ret[ret.length] = ename;
            }
        }
    }
    return ret;
}


/**
 * get enum value by enum key,seperated by ","
 * name: attribute name
 */
export function getMultiEnumValue(name: string, keystr: string) {
    if (keystr == null || keystr + "" == "undefined")
        return "";
    const ddo = getDDO(name); //get actual name by ddo
    let str = "";
    if (ddo) {
        const idx = (<any>window).TDD_ENUM_PACKAGE[2][ddo.Name];
        if (!isEmpty(idx) && typeof ((<any>window).TDD_ENUM_PACKAGE[0][idx]) == "object") {
            const keys = keystr.split(",");
            for (let i = 0; i < keys.length; i++) {
                if ((<any>window).TDD_ENUM_PACKAGE[0][idx][keys[i]])
                    str += ", " + (<any>window).TDD_ENUM_PACKAGE[0][idx][keys[i]];
            }
        }
    }
    if (str.length > 0)
        return str.substr(1);
    return "";
}
