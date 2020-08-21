/**
 * 替换api中{id}变量成具体的值
 * @param str
 * @param obj
 * @returns {*}
 */
export function format(str, obj) {
    const formatRe = /\{([^}]+)\}/g

    if (!obj) {
        return str
    }
    return str.replace(formatRe, (match, key) => obj[key])
}
