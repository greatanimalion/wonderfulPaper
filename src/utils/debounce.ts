//生成一个防抖函数
export default function debounce(func: Function, wait: number=1000) {
    let timeout: any;
    return function (this:any,...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
