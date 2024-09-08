//生成一个防抖函数

/**
 * @param func 要防抖的函数
 * @param wait 防抖时间，单位为毫秒，默认为1000毫秒
*/
export default function debounce(func: Function, wait: number=1000):Function{
    let timeout: any;
    return function (this:any,...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
