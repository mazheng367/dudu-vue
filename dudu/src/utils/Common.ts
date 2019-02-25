import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import trim from 'lodash/trim';
import {parse} from "@fortawesome/fontawesome-svg-core";

export function parseQueryString(str: string) {
    if (isEmpty(str)) {
        return {};
    }
    let token = str,
        start = token.indexOf("?"),
        queryString: { [key: string]: string } = {},
        search,
        i;
    if (!token || start === -1) {
        return queryString;
    }
    search = token.substring(start + 1);
    const parts = search.split("&");
    for (i = 0; i < parts.length; i++) {
        let tmp = parts[i].split("=");
        queryString[tmp[0]] = tmp[1];
    }
    return queryString;
}


export function escapeHTMLString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str + "";
    if (!/[&<>"" ]/.test(str)) {
        return str;
    }
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/[""]/g, "&quot;");
    str = str.replace(/ /g, "&nbsp;");
    //change only first &nbsp; to blank in order to wrap when long text long
    str = str.replace(/(&nbsp;)+/ig,
        function (findstr, first, pos) {
            return " " + findstr.substr(first.length);
        }
    );
    return str;
}

export function escapeXMLString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str + '';
    if (!/[&<>"'"]/.test(str)) return str;

    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/[""]/g, "&quot;");
    str = str.replace(/['']/g, "&apos;");
    return str;
}

export function escapeJSString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str.replace(/\\/g, "\\x5c");
    str = str.replace(/[""]/g, "\\x22");
    str = str.replace(/['']/g, "\\x27");
    str = str.replace(/</g, "\\x3c");
    str = str.replace(/\r\n/g, "\\x0d\\x0a");
    str = str.replace(/\r/g, "\\x0d");
    str = str.replace(/\n/g, "\\x0a");
    return str;
}

export function escapeURLString(str: string) {
    if (isEmpty(str))
        return "";
    return encodeURIComponent(str);
}

export function unescapeHTMLString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str.replace(/&nbsp;/g, " ");
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&nbsp;/g, " ");
    return str;
}

export function unescapeXMLString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str.replace(/&nbsp;/g, " ");
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&nbsp;/g, " ");
    return str;
}

export function unescapeJSString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    str = str.replace(/\\\\x22/g, "\"");
    str = str.replace(/\\\\x27/g, "\'");
    str = str.replace(/\\\\x3c/g, "<");
    str = str.replace(/\\\\x0d\\\\x0a/g, "\\r\\n");
    str = str.replace(/\\\\x0d/g, "\\r");
    str = str.replace(/\\\\x0a/g, "\\n");
    str = str.replace(/\\\\x5c/g, "\\");
    return str;
}

export function unescapeURLString(str: string) {
    if (isEmpty(str)) {
        return "";
    }
    return decodeURIComponent(str);
}

export function lastName(name: string) {
    if (isEmpty(name))
        return "";
    name += "";
    return name.split(".").pop();
}

function firstName(name: string) {
    if (isEmpty(name))
        return "";
    name += "";
    return name.split(".").shift();
}

export function name2var(name: string) {
    return name.replace(/\./g, "__");
}


export function var2name(name: string) {
    return name.replace(/\__/g, ".");
}


export function name2pname(name: string) {
    if (isEmpty(name))
        return "";
    name += "";
    const arr = name.split(".");
    arr.pop();
    return arr.join(".");
}


export function name2cname(name: string, rep: string) {
    if (isEmpty(name))
        return "";
    name += "";
    const arr = name.split(".");
    arr.shift();
    if (rep && arr.length > 0)
        arr[arr.length - 1] = rep;
    return arr.join(".");
}


export function nl2br(str: string) {
    str = str + "";
    str = str.replace(/\r\n/g, "<br/>");
    str = str.replace(/\r/g, "<br/>");
    str = str.replace(/\n/g, "<br/>");
    return str;
}


export function getUserDateFormat() {
    let df = (window as any).USER_LOCALE.DateFormat;
    if (isEmpty(df))
        df = "YYYY-MM-DD";
    let tf = (window as any).USER_LOCALE.TimeFormat;
    if (isEmpty(tf)) {
        tf = "HH24:MI:SS";
    }
    return df + " " + tf;
}


export function isValidDate(val: string, useLocale?: string) {
    val += "";
    if (val.length == 0) return true;
    let restr;
    if (useLocale) {
        restr = (window as any).USER_LOCALE.DateFormat;
    } else {
        restr = "YYYY-MM-DD";
    }
    restr = restr.replace("YYYY", "([1-9]\\d{3})");
    restr = restr.replace("MM", "(0[1-9]|11|12|10)");
    restr = restr.replace("DD", "(0[1-9]|[1-2][0-9]|30|31)");
    const re = new RegExp("^" + restr + "$");
    return re.test(val);
}


export function isValidEmail(email: string) {
    if (isEmpty(email)) {
        return false;
    }
    //var reg =/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/;
    //return reg.test(email);
    const tmp = email.split("@");
    if (tmp.length != 2) {
        return false;
    }

    let pos = email.indexOf(",");
    if (pos >= 0) {
        return false;
    }

    pos = email.indexOf(";");
    return pos < 0;
}


export function isValidMobile(mobile: string) {
    if (isEmpty(mobile)) {
        return false;
    }
    const reg = /^[+]?[0-9]+$/;
    return reg.test(mobile);
}


export function isValidDatetime(val: string, useLocale?: string) {
    val += "";
    if (val.length == 0) return true;

    val += "";
    if (val.length == 0) return true;
    let restr;
    if (useLocale)
        restr = (window as any).USER_LOCALE.DateFormat + " " + (window as any).USER_LOCALE.TimeFormat;
    else
        restr = "YYYY-MM-DD HH24:MI:SS";

    restr = restr.replace("YYYY", "([1-9]\\d{3})");
    restr = restr.replace("MM", "(0[1-9]|11|12|10)");
    restr = restr.replace("DD", "(0[1-9]|[1-2][0-9]|30|31)");
    if (restr.indexOf("HH24") > 0) //24hour
    {
        restr = restr.replace("HH24", "([01][0-9]|2[0-3])");
        restr = restr.replace(":MI:SS", "(:([0-5][0-9])){1,2}");
    } else { //12 hour
        restr = restr.replace("HH", "(0[0-9]|10|11|12)");
        restr = restr.replace(":MI:SS", "(:([0-5][0-9])){1,2}([aApP][mM])");
    }
    const re = new RegExp("^" + restr + "$");
    return re.test(val);
}


export function isValidID(val: any) {
    val = trim(val);
    if (!isInteger(val)) return false;
    return parseInt(val) > 0;
}


export function isValidFestival(val: string) {
    val += "";
    if (val.length == 0) return true;
    let restr = "YYYY-MM-DD";
    restr = restr.replace("YYYY", "([1-9]\\d{3})");
    restr = restr.replace("MM", "(0?[1-9]|11|12|10)");
    restr = restr.replace("DD", "(0?[1-9]|[1-2][0-9]|30|31)");
    let re = new RegExp("^" + restr + "-0|1$");
    if (!re.test(val)) {
        restr = "MM-DD";
        restr = restr.replace("YYYY", "([1-9]\\d{3})");
        restr = restr.replace("MM", "(0?[1-9]|11|12|10)");
        restr = restr.replace("DD", "(0?[1-9]|[1-2][0-9]|30|31)");
        re = new RegExp("^" + restr + "-0|1$");
        return re.test(val);
    }
    return true;
}


export function toUserDate(value: string) {
    if (isEmpty(value)) return "";
    let ymd;
    if (isValidDatetime(value))
        ymd = value.split("-");
    else if (isValidDate(value))
        ymd = value.split(" ")[0].split("-");
    else
        return "";
    value = (window as any).USER_LOCALE.DateFormat;
    value = value.replace("YYYY", ymd[0]);
    value = value.replace("MM", ymd[1]);
    value = value.replace("DD", ymd[2]);
    return value;
}


export function toUserDatetime(value: string, nosec?: boolean) {
    if (isEmpty(value)) return "";
    if (isEmpty(nosec)) {
        if ((window as any).USER_LOCALE.TimeFormat.search('SS') >= 0)
            nosec = false;
        else
            nosec = true;
    }
    let ymd, hms;
    if (isValidDatetime(value)) {
        const tmp = value.split(" ");
        ymd = tmp[0].split("-");
        hms = tmp[1].split(":");
    } else if (isValidDate(value)) {
        ymd = value.split("-");
        hms = ["12", "0", "0"];
    } else {
        return "";
    }

    //month is 0-11
    const val = new Date(parseInt(ymd[0]), parseInt(ymd[1]) - 1, parseInt(ymd[2]), parseInt(hms[0])/*+USER_LOCALE.TimeZone*1*/, parseInt(hms[1]), parseInt(hms[2]));
    if (isEmpty(val.toLocaleString())) return "";
    let y, m, d, h, i, s, p;
    y = val.getFullYear();
    m = val.getMonth() + 1;
    d = val.getDate();
    h = val.getHours();
    i = val.getMinutes();
    s = val.getSeconds();
    p = "";
    if ((window as any).USER_LOCALE.TimeFormat != "HH24:MI:SS") {
        if (h > 12) {
            h -= 12;
            p = "PM";
        } else
            p = "AM";
    }
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;
    if (i < 10) i = "0" + i;
    if (s < 10) s = "0" + s;
    value = (window as any).USER_LOCALE.DateFormat;
    value = value.replace("YYYY", y.toString());
    value = value.replace("MM", m.toString());
    value = value.replace("DD", d.toString());
    if (nosec)
        value += " " + h + ":" + i + p;
    else
        value += " " + h + ":" + i + ":" + s + p;
    return value;
}


export function toNumber(value: string) {
    if (typeof value === "number") {
        return value;
    }
    let num = Number(value);
    return isNaN(num) ? 0 : num;
}


export function toSystemDate(value: string) {
    return value; // TODO 多时区暂不支持
}


export function toSystemDatetime(value: string) {
    return value; // TODO 多时区暂不支持
}


export function isInteger(val: string) {
    if (isEmpty(val)) {
        return false;
    }
    val += "";
    if (val.length == 0) return false;
    const string = "1234567890";
    for (let i = 0; i < val.length; i++) {
        if (string.indexOf(val.charAt(i)) == -1)
            return false;
    }
    return true;
}


export function isNumeric(val: string) {
    if (val == "")
        return true;
    return (parseFloat(val) == parseInt(val));
}


export function number_format(number: number, decimals: number, dec_point: string, thousands_sep: string) {
    let n = number, prec = decimals;
    const toFixedFix = function (n: number, prec: number) {
        const k = Math.pow(10, prec);
        return (Math.round(n * k) / k).toString();
    };
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    const sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    const dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
    let s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
    const abs = toFixedFix(Math.abs(n), prec);
    let _, i;
    if (parseInt(abs) >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
        _[0] = s.slice(0, i + Number(n < 0)) + _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }
    const decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length - decPos - 1) < prec) {
        s += new Array(prec - (s.length - decPos - 1)).join("0") + '0';
    } else if (prec >= 1 && decPos === -1) {
        s += dec + new Array(prec).join("0") + '0';
    }
    return s;
}


export function formatSysNumeric(value: number, prec: number) {
    if (!isNumeric(value + "")) {
        return "";
    }
    if (value + "" == "") {
        value = 0;
    }
    return number_format(value, prec, ".", "");
}


/**
 * fromat numeric value
 * value: numeric value
 * prec: decimal number
 * isCurrenc: default false;
 */
export function formatNumeric(value: number, prec: number, isCurrency: boolean) {
    let str = formatSysNumeric(value, prec);
    if (str == "") return "";

    let cur = "";
    if (isCurrency) {
        cur = (window as any).USER_LOCALE.CurrencySymbol;
    }

    //remove Negative
    let sign = "";
    if (str.substr(0, 1) == "-") {
        sign = "-";
        str = str.substr(1);
    }
    //Thousends Separator
    let pos = str.length;
    let dec = "";
    if (prec > 0) {
        pos = str.indexOf(".", 0);
        if (pos < 0) {
            pos = str.length;
            dec = "";
            for (let i = 0; i < prec; i++)
                dec += "0";
        } else
            dec = str.substr(pos + 1);
    }
    if (pos > 3) {
        const arr = new Array();
        let pos1 = pos % 3;
        if (pos1 > 0) {
            arr[arr.length] = str.substr(0, pos1);
        }
        while (pos1 < pos) {
            arr[arr.length] = str.substr(pos1, 3);
            pos1 += 3;
        }
        str = arr.join((window as any).USER_LOCALE.Separator);
    } else
        str = str.substr(0, pos);
    //DecimalSymbol
    if (dec != "")
        str += (window as any).USER_LOCALE.DecimalSymbol + dec;

    //NegativeFormat
    if (sign == "-") {
        switch ((window as any).USER_LOCALE.NegativeFormat) {
            case 1: //red unsigned
                str = "<font color=red>" + str + "</font>";
                break;
            case 2: //red (unsigned)
                str = "<font color=red>(" + str + ")</font>";
                break;
            case 3: //red signed
                str = "<font color=red>" + sign + str + "</font>";
                break;
            case 4: //(unsigned)
                str = "(" + str + ")";
                break;
            default:
                str = sign + str;
        }
    }
    str = cur + str;

    return str;
}


/**
 * convert array or object like [k] = v to 2 dimension array like [[k1,v1],[k2,v2],...]
 */
export function kv2array(obj: { [key: string]: any }) {
    const ret = [];
    if (isObject(obj) || isArray(obj)) {
        for (let k in obj) {
            if (typeof (obj[k]) === "function") {
                continue;
            }
            ret.push([k, obj[k]]);
        }
    }
    return ret;
}


export function array2kv(arr: Array<any>) {
    if (!arr || !arr.length) {
        return {};
    }
    let obj: { [key: string]: any } = {};
    arr.forEach((item, index) => {
        if (!isEmpty(item)) {
            obj[index] = item;
        }
    });
    return obj;
}


export function isValidSequenceFormat(str: string) {
    if (isEmpty(str)) return true;
    str = str.toUpperCase();
    let startbrackets = false;
    let bracketsclose = false;
    let subexp = '';
    let seqno = '';
    let nocount = 0;
    const arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
        const ch = arr[i];
        if (ch == '{') {
            startbrackets = true;
            bracketsclose = false;
        } else if (ch == '}') {
            if (!startbrackets) return false;
            bracketsclose = true;
            startbrackets = false;
            if (subexp.slice(0, 1) == "Y") {
                if (subexp != 'YYYY' && subexp != 'YY') return false;
            } else if (subexp.slice(0, 1) == "M") {
                if (subexp != 'MM') return false;
            } else if (subexp.slice(0, 1) == "D") {
                if (subexp != 'DD') return false;
            } else if (subexp.slice(0, 1) == "0") {
                const len = subexp.length;
                if (len <= 0 || len > 16) return false;
                if (Number(subexp) !== 0) return false;
                seqno = subexp;
                nocount++;
                if (nocount > 1) return false;
            } else return false;
            subexp = "";
        } else {
            if (startbrackets) subexp += arr[i];
        }
    }
    if (startbrackets && !bracketsclose) return false;
    if (seqno == '') return false;
    seqno = '{' + seqno + '}';
    if (str.indexOf(seqno) != str.length - seqno.length) return false;
    return true;
}

export function linkAppend(url: string, varName: string, val: string) {
    if (isEmpty(url))
        return "";
    varName += "=";
    let pos = url.indexOf("?" + varName);
    if (pos < 0)
        pos = url.indexOf("&" + varName);
    if (pos > 0) {
        const pos1 = url.indexOf("&", pos + 1);
        let str = url.substr(0, pos + 1) + varName + encodeURIComponent(val);
        if (pos1 > 0) {
            str += url.substr(pos1);
        }
        return str;
    }
    let c = "?";
    if (url.indexOf("?") > 0)
        c = "&";
    return url + c + varName + encodeURIComponent(val);
}

export function addPathParamToURL(url: string) {
    // const _queryMap = parseQueryString();
    // if (_queryMap && !isBlank(_queryMap.path)) {
    //     url = linkAppend(url, "path", _queryMap.path);
    // }
    return url;
}


export function getDataFromRecord(record: any, valName: string) {
    return getDataFromDataObj(record.data, valName);
}


export function getDataFromDataObj(dataObj: any, valName: string) {
    let data;
    if (valName.indexOf(".") > -1) {
        let pos, parts = valName.split(".");
        data = dataObj;
        while ((pos = parts.splice(0, 1))) {
            if (!pos || !pos.length) {
                break;
            }
            if (data) {
                const key = pos[0];
                data = data[key];
            }
        }
    } else {
        data = dataObj[valName];
    }
    return data;
}


export function throwArgumentException(argName: string) {
    throwException(`${argName} is required(是必须的,检查参数设定)`);
}


export function throwException(message: string) {
    //throw Ext.create("Dudu.util.AppException", {message: message});
}


export function getLang() {
    return 2;
}


/*export function dispatchGridEvent(elem, eventType) {
    let el = Ext.get(elem),
        cmp = Ext.getCmp(el.getAttribute("data-gridid")),
        dataId = el.getAttribute("data-rowid"),
        recordId = el.getAttribute("data-recordid"),
        ev = eventType.toLowerCase();
    if (el && cmp) {
        cmp.fireEventArgs(ev, [el, cmp, dataId, recordId]);
    }
}*/

/*
export function createEmptyTopBtns(addBack) {
    const btns = [];
    if (addBack === true) {
        btns.push({ui: 'dudu-btn', iconCls: 'x-fa fa-arrow-left', handler: 'back', userCls: "dudu-btn-default"});
    }
    return btns;
}*/
