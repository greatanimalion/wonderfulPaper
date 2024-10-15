/**
 * 解析css样式，返回一个对象，值为样式值
 * @param css 样式字符串
 * 
*/

export default function parseCssToObject(css: string):Record<string,string> {
    let res:Record<string,string>={} 
    css.split(';').forEach(line=>{ 
        if(line.trim()=='')return 
        let [key,value]=line.split(':')
        res[key.trim()]=value.trim()
    })
    return res;
}

export function parseObjectToCssText(css:Record<string,string>):string {
    let res:string=''
    Object.entries(css).map(([key,value])=>{if(value=='')return ;else res+=`${key}:${value};`})
    return res
}

