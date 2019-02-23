import isEmpty from 'lodash/isEmpty';

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