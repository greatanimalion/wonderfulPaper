/**
 * @description: 一个将对象中指定属性提取到新对象中的函数
 * @param {string|number[]} tarage 目标属性数组
 * @param {{[key:string|number]:any}} source 源对象
 * @return {Object} 目标对象
*/
export default function someAttributeObject<T extends string|number>(tarage:T[], source:{[key:string|number]:any}):{[key in T]:any} {
    let res:{[key in T]:any}={} as {[key in T]:any};
    for (let key of tarage) {
        if (source.hasOwnProperty(key)) {
            res[key] = source[key];
        }
    }
    return res;
}
/**
 * 索引签名必须是具体的属性名number，string，不能是泛型，否则会报错，只能用映射 in
*/