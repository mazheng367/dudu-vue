import objectAssign from "lodash/assign";
import objectAssignWith from "lodash/assignWith";
import isEmpty from "lodash/isEmpty";
import startsWith from "lodash/startsWith";
import cloneDeep from "lodash/cloneDeep";

class ConditionData {
    Name: string;
    QuickSearchValue: string;
    DefinedConds: Array<CondItem>;
    DefinedAppends: Array<CondItem>;
    CondRelation: string;
    SortAttrs: { [key: string]: string };
    Params: { [key: string]: string };
    QuickName: string;
    QuickID: number;
    Quicks: { [key: string]: string };
    DateOffset: number;
    CurrentDate: string;
    PageNo: number;
    PageRow: number;

    [key: string]: any;

    constructor() {
        this.Name = "";
        this.QuickSearchValue = "";
        this.DefinedConds = [];
        this.DefinedAppends = [];
        this.CondRelation = "";
        this.SortAttrs = {};
        this.Params = {};
        this.QuickName = "";
        this.QuickID = 0;
        this.Quicks = {};
        this.DateOffset = 1;
        this.CurrentDate = "";
        this.PageNo = 0;
        this.PageRow = 0;
    }
}

interface CondItem {
    Name: string;
    Operator: number;
    Value1: string;
    Value2: string;
}

export class SearchCondition {

    private condPosIndex = 1;

    private _opers = ["or", "and"];
    private _condData: ConditionData | null = null;

    constructor(config?: ConditionData) {
        if (config !== null && config !== undefined) {
            this.condData = objectAssign(new ConditionData(), config);
        }
    }

    set condData(value) {
        this._condData = value;
    }

    get condData() {
        return this._condData;
    }

    applyData(obj: ConditionData) {
        let newData = obj;
        const old = this.condData;
        if (typeof obj === "string") {
            newData = JSON.parse(obj) as ConditionData;
        }
        objectAssign(old, newData);
        this.condPosIndex = newData.DefinedConds.length + 1;
        return this;
    }

    applyProperty(newData: ConditionData) {
        if (isEmpty(newData)) {
            return;
        }
        const data = this.condData;
        objectAssign(data, newData);
        if (newData.DefinedConds) {
            this.condPosIndex = newData.DefinedConds.length + 1;
        }
        return this;
    }


    and(field: string | SearchCondition, value: any, operator: number) {
        if (typeof field === "object" && field instanceof SearchCondition) {
            this.addConditionObject(field, true);
        } else {
            this.addCondition(field, value, operator, true);
        }
        return this;
    }


    or(field: string | SearchCondition, value: any, operator: number) {
        if (typeof field === "object" && field instanceof SearchCondition) {
            this.addConditionObject(field, false);
        } else {
            this.addCondition(field, value, operator, false);
        }
        return this;
    }


    addConditionObject(cond: SearchCondition, and: boolean) {
        const condData = cond.condData;
        if (condData === null || condData === undefined) {
            return;
        }
        let isEmptyCondData = true;
        if (condData.DefinedConds && condData.DefinedConds.length) {
            Array.prototype.push.apply(condData.DefinedConds, condData.DefinedConds);
            isEmptyCondData = false;
        }
        if (condData.DefinedAppends && condData.DefinedAppends.length) {
            Array.prototype.push.apply(condData.DefinedAppends, condData.DefinedAppends);
            isEmptyCondData = false;
        }
        if (!isEmptyCondData) {
            if (condData.DefinedConds.length > 1) {
                condData.CondRelation = `(${condData.CondRelation})`;
            }
            this.setConditionRelation(Number(and !== false), condData.CondRelation);
        }
    }


    addCondition(field: string, value: any, operator: number, and: boolean) {
        const condData = this.condData;
        if (condData === null || condData === undefined) {
            return;
        }
        if (!isEmpty(condData.Name) && !startsWith(field, condData.Name)) {
            field = condData.Name + "." + field;
        }
        const newCond = {Name: field, Operator: operator, Value1: "", Value2: ""};
        if (value && Object.prototype.toString.call(value) === "[object Object]" && value.hasOwnProperty("Value1") && value.hasOwnProperty("Value2")) {
            newCond.Value1 = value.Value1 + "";
            newCond.Value2 = value.Value2 + "";
        } else {
            newCond.Value1 = value + "";
            newCond.Value2 = "";
        }
        condData.DefinedConds.push(newCond);
        this.setConditionRelation(Number(and !== false));
    }


    setSorter(prop: string, direct: string) {
        const data = this.condData;
        if (data === null || data === undefined) {
            return;
        }
        const sorters = data.SortAttrs;
        if (!isEmpty(data.Name) && !startsWith(prop, data.Name)) {
            prop = data.Name + "." + prop;
        }
        sorters[prop] = direct;
    }


    clearSorters() {
        const data = this.condData;
        if (data === null || data === undefined) {
            return;
        }
        const sorters = data.SortAttrs,
            props = Object.keys(sorters);
        if (props && props.length) {
            props.forEach(p => delete sorters[p]);
        }
    }


    clearCondition() {
        const data = this.condData;
        if (data === null || data === undefined) {
            return;
        }
        data.DefinedConds.length = 0;
        data.CondRelation = "";
        this.condPosIndex = 1;
    }

    setConditionRelation(op: number, objRel?: any) {
        const data = this.condData;
        let expr = "";
        if (data === null || data == undefined) {
            return;
        }
        if (objRel !== null && objRel !== undefined && (typeof objRel === "string") && !isEmpty(objRel)) {
            let o = this.condPosIndex;
            expr = objRel.replace(/\d+/g, () => `${o++}`);
            this.condPosIndex = o;
        } else {
            expr = this.condPosIndex.toString();
            this.condPosIndex += 1;
        }
        if (isEmpty(data.CondRelation)) {
            data.CondRelation = `${expr}`;
        } else {
            data.CondRelation += ` ${this._opers[op]} ${expr}`;
        }
    }


    setName(name: string) {
        const condData = this.condData;
        if (condData) {
            condData.Name = name;
        }
    }


    setParams(name: string, value: any, override: boolean) {
        let rewrite = override !== false;
        const data = this.condData;
        if (data === null || data == undefined) {
            return;
        }
        if (typeof name === "object") {
            rewrite = !!value;
            if (rewrite) {
                objectAssign(data.Params, name);
            } else {
                objectAssignWith(data.Params, name, (oldValue, srcValue) => (oldValue === null || oldValue === undefined) ? srcValue : oldValue);
            }
        } else {
            if (name && value !== null && value !== undefined) {
                if (!data.Params.hasOwnProperty(name) || rewrite) {
                    data.Params[name] = value;
                }
            }
        }
    }

    setQuicks(id: string, name: string, quicks: any) {
        const condData = this.condData;
        if (condData === null || condData === undefined) {
            return;
        }
        if (id && !isNaN(Number(id))) {
            condData.QuickID = Number(id);
        }
        condData.QuickName = decodeURIComponent(name);
        if (!isEmpty(quicks)) {
            condData.Quicks = quicks;
        }
    }

    stringify() {
        const dataItem = this.condData,
            copyItem = objectAssign({}, dataItem);
        //复制新数组
        copyItem.DefinedConds = this.getCopyArray<CondItem>("DefinedConds") || [];
        if (copyItem.DefinedConds && copyItem.DefinedConds.length) {
            copyItem.DefinedConds.forEach(function (item) {
                if (!item) {
                    return;
                }
                if (item.hasOwnProperty("and")) {
                    delete (<any>item).and;
                }
                if (item.hasOwnProperty("deletable")) {
                    delete (<any>item).deletable;
                }
            });
        }
        return JSON.stringify(copyItem);
    }

    getCopyArray<T>(prop: any) {
        const dataItem = this.condData;
        if (dataItem === null || dataItem === undefined) {
            return;
        }
        const source = dataItem[prop],
            target: Array<T> = [];
        if (source && source.length) {
            source.forEach((item: any) => target.push(objectAssign({}, item) as T));
        }
        return target;
    }

    setPageRow(row: number) {
        const condData = this.condData;
        if (condData === null || condData === undefined) {
            return;
        }
        if (!row || row < 0) {
            row = 10;
        }
        condData.PageRow = row;
    }

    setPageNo(no: number) {
        const condData = this.condData;
        if (condData === null || condData === undefined) {
            return;
        }
        if (!no || no < 0) {
            no = 0;
        }
        condData.PageNo = no;
    }

    clone() {
        return cloneDeep(this);
    }
}