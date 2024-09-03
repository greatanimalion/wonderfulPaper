/**
 * @description: 一个将对象中指定属性提取到新对象中的函数
 * @param {string[]} tarage 目标属性数组
 * @param {{[key:string|number]:any}} source 源对象
 * @return {Object} 目标对象
*/
export default function someAtttributeObject(tarage:string[], source:{[key:string|number]:any}):Object {
    let res:{[key:string|number]:any}={};
    for (let key of tarage) {
        if (source.hasOwnProperty(key)) {
            res[key as string] = source[key];
        }
    }
    return res;
}