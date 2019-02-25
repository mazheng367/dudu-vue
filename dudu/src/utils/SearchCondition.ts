import objectAssignIn from "lodash/assignIn";
import {isEmpty} from "lodash-es";

class ConditionData {
    Name: string;
    QuickSearchValue: string;
    DefinedConds: Array<any>;
    DefinedAppends: Array<any>;
    CondRelation: string;
    SortAttrs: {};
    Params: {};
    QuickName: string;
    QuickID: number;
    Quicks: {};
    DateOffset: number;
    CurrentDate: string;
    PageNo: number;
    PageRow: number;

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

class SearchCondition {

    private condPosIndex = 1;

    private _opers = ["or", "and"];
    private _condData: ConditionData | null = null;

    constructor(config: ConditionData) {
        this.condData = objectAssignIn(new ConditionData(), config);
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
        objectAssignIn(old, newData);
        this.condPosIndex = newData.DefinedConds.length + 1;
        return this;
    }

    applyProperty(newData: ConditionData) {
        if (isEmpty(newData)) {
            return;
        }
        const data = this.condData;
        objectAssignIn(data, newData);
        if (newData.DefinedConds) {
            this.condPosIndex = newData.DefinedConds.length + 1;
        }
        return this;
    }


    and(field, value, operator) {
        if (typeof field === "object" && field instanceof Dudu.util.SearchCondition) {
            this.addConditionObject(field, true);
        } else {
            this.addCondition(field, value, operator, true);
        }
        return this;
    }


    or(field, value, operator) {
        if (typeof field === "object" && field instanceof Dudu.util.SearchCondition) {
            this.addConditionObject(field, false);
        } else {
            this.addCondition(field, value, operator, false);
        }
        return this;
    }


    addConditionObject(cond, and) {
        const condData = cond.getCondData();
        let isEmptyCondData = true;
        if (condData.DefinedConds && condData.DefinedConds.length) {
            Array.prototype.push.apply(this.getCondData().DefinedConds, condData.DefinedConds);
            isEmptyCondData = false;
        }
        if (condData.DefinedAppends && condData.DefinedAppends.length) {
            Array.prototype.push.apply(this.getCondData().DefinedAppends, condData.DefinedAppends);
            isEmptyCondData = false;
        }
        if (!isEmptyCondData) {
            if (condData.DefinedConds.length > 1) {
                condData.CondRelation = `(${condData.CondRelation})`;
            }
            this.setConditionRelation(Number(and !== false), condData.CondRelation);
        }
    }


    addCondition(field, value, operator, and) {
        const condData = this.getCondData();
        if (!Dudu.util.Common.isBlank(condData.Name) && !Ext.String.startsWith(field, condData.Name)) {
            field = condData.Name + "." + field;
        }
        const newCond = {Name: field, Operator: operator},
            data = this.getCondData();
        if (value && Object.prototype.toString.call(value) === "[object Object]" && value.hasOwnProperty("Value1") && value.hasOwnProperty("Value2")) {
            newCond.Value1 = value.Value1 + "";
            newCond.Value2 = value.Value2 + "";
        } else {
            newCond.Value1 = value + "";
            newCond.Value2 = "";
        }
        data.DefinedConds.push(newCond);
        this.setConditionRelation(Number(and !== false));
    }


    setSorter(prop, direct) {
        const data = this.getCondData(),
            sorters = data.SortAttrs;
        if (!Dudu.util.Common.isBlank(data.Name) && !Ext.String.startsWith(prop, data.Name)) {
            prop = data.Name + "." + prop;
        }
        sorters[prop] = direct;
    }


    clearSorters() {
        const data = this.getCondData(),
            sorters = data.SortAttrs,
            props = Ext.Object.getKeys(sorters);
        if (props && props.length) {
            Ext.Array.forEach(props, p => delete sorters[p]);
        }
    }


    clearCondition() {
        const data = this.getCondData();
        data.DefinedConds.length = 0;
        data.CondRelation = "";
        this.condPosIndex = 1;
    }


    setConditionRelation(op, objRel) {
        const data = this.getCondData();
        let expr = "";
        if (objRel !== null && objRel !== undefined && (typeof objRel === "string") && !Dudu.util.Common.isBlank(objRel)) {
            let o = this.condPosIndex;
            expr = objRel.replace(/\d+/g, () => o++);
            this.condPosIndex = o;
        } else {
            expr = this.condPosIndex;
            this.condPosIndex += 1;
        }
        if (Dudu.util.Common.isBlank(data.CondRelation)) {
            data.CondRelation = `${expr}`;
        } else {
            data.CondRelation += ` ${this._opers[op]} ${expr}`;
        }
    }


    setName(name) {
        const condData = this.getCondData();
        condData.Name = name;
    }


    setParams(name, value, override) {
        let rewrite = override !== false;
        const data = this.getCondData();

        if (typeof name === "object") {
            rewrite = !!value;
            if (rewrite) {
                Ext.apply(data.Params, name);
            } else {
                Ext.applyIf(data.Params, name);
            }
        } else {
            if (name && value !== null && value !== undefined) {
                if (!data.Params.hasOwnProperty(name) || rewrite) {
                    data.Params[name] = value;
                }
            }
        }
    }


    setQuicks(id, name, quicks) {
        const condData = this.getCondData();
        if (id && !isNaN(Number(id))) {
            condData.QuickID = Number(id);
        }
        condData.QuickName = decodeURIComponent(name);
        if (!Ext.Object.isEmpty(quicks)) {
            condData.Quicks = quicks;
        }
    }


    stringify() {
        const dataItem = this.getCondData(),
            copyItem = Ext.apply({}, dataItem);
        //复制新数组
        copyItem.DefinedConds = this.getCopyArray("DefinedConds");
        if (copyItem.DefinedConds && copyItem.DefinedConds.length) {
            Ext.Array.forEach(copyItem.DefinedConds, function (item) {
                if (!item) {
                    return;
                }
                if (item.hasOwnProperty("and")) {
                    delete item.and;
                }
                if (item.hasOwnProperty("deletable")) {
                    delete item.deletable;
                }
            });
        }
        return Ext.JSON.encode(copyItem);
    }


    getCopyArray(prop) {
        const dataItem = this.getCondData(),
            source = dataItem[prop],
            target = [];
        if (source && source.length) {
            Ext.Array.forEach(source, function (item) {
                target.push(Ext.apply({}, item));
            });
        }
        return target;
    }


    setPageRow(row) {
        const condData = this.getCondData();
        if (!row || row < 0) {
            row = 10;
        }
        condData.PageRow = row;
    }


    setPageNo(no) {
        const condData = this.getCondData();
        if (!no || no < 0) {
            no = 0;
        }
        condData.PageNo = no;
    }


    clone() {
        const newCond = Ext.create("Dudu.util.SearchCondition"),
            currentCondData = this.getCondData(),
            newData = newCond.getCondData();
        //复制非引用字段
        Ext.copy(newData, this.getCondData(), "Name,QuickSearchValue,CondRelation,QuickName,QuickID,DateOffset,CurrentDate,PageNo,PageRow");
        //复制引用字段
        newData.SortAttrs = Ext.apply({}, currentCondData.SortAttrs);
        newData.Params = Ext.apply({}, currentCondData.Params);
        newData.Quicks = Ext.apply({}, currentCondData.Quicks);
        Ext.Array.forEach(currentCondData.DefinedConds, cond => {
            newData.DefinedConds.push(Ext.apply({}, cond));
        });
        Ext.Array.forEach(currentCondData.DefinedAppends, condAppend => {
            newData.DefinedAppends.push(Ext.apply({}, condAppend));
        });
        newCond.condPosIndex = this.condPosIndex;
        return newCond;
    }
}