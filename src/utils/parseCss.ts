/**
 * 解析css样式，返回一个对象
 * @param css 样式字符串
 * @param options 需要解析的样式属性名数组，但是目前出现小bug
*/

export function parseCss(css: string,options:string[]):Record<string,string> {
    let res:Record<string,string>={} 
    css.split(';').forEach(line=>{ 
        if(line.trim()=='')return 
        let [key,value]=line.split(':')
        // let keyTrim=key.trim()
        //优化无效
        // if(options.includes(keyTrim)){
        //     res[keyTrim]=value.trim()
        // }
        res[key.trim()]=value.trim()
    })
    return res;
}


