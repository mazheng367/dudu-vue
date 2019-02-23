const upgradeMap: { [key: string]: string } = {"bar-chart": "chart-bar"};

export function vueIconCls(value: string): string {
    if (!value) {
        return value;
    }

    const regex = /^(?:x-)?fa\s+fa-(.+)/g;
    const result = regex.exec(value);
    if (!result || !result.length) {
        return value;
    }
    if (Object.prototype.hasOwnProperty.call(upgradeMap, result[1])) {
        return upgradeMap[result[1]];
    }
    return result[1];
}