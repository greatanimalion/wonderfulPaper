function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
/**
这是一个泛型函数，名为 strEnum。
泛型参数 T 被限制为 string 类型。
函数接受一个参数 o，它是一个类型为 Array<T> 的数组。
函数的返回类型是 { [K in T]: K }，即一个对象，其键和值都是类型 T 的字符串。
*/
