type KeyFromStringToNumberResult<T extends Object, U> = {
    [P in keyof T]: P extends U ? number : string;
};

/**
 * 将对象中指定键值转换为数字
 * @param obj 要转换的对象
 * @param key 要转换的键值
 * @returns 转换后的对象
 * @default 可以借助TS的类型推导来自动推导出类型 <U extends typeof T,T extends Object>
 */
export default function keyFromStringToNumber<U,T extends Object>(obj: T, key: U[]): KeyFromStringToNumberResult<T,U> {
    let result = {} as KeyFromStringToNumberResult<T, U>;
    // @ts-ignore
    Object.keys(obj).forEach((k:U) => {
        try {
            if (key.includes(k)) {
                //@ts-ignore
                result[k] = Number(obj[k]);
            } else {
                //@ts-ignore
                result[k] = obj[k];
            }
        } catch (error) {
            console.error(`无效键值 '${String(k)}':`, error);
        }
    });
    return result;
}