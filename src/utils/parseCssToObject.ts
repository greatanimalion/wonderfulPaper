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
        let keyTrim=key.trim()
        if(keyTrim=='top'||keyTrim=='left'||keyTrim=='height'||keyTrim=='width')return;//忽略top、left、height、width属性
        res[keyTrim]=value.trim()
    })
    return res;
}

/**
 * 解析对象，返回css样式字符串,并丢弃top、left、heigth、width属性
 * @param css 样式对象
*/
export function parseObjectToCssText(css:Record<string,string>):string {
    let res:string=''
    Object.entries(css).map(([key,value])=>{
        if(key=='top'||key=='left'||key=='height'||key=='width')return//忽略top、left、height、width属性
         res+=`${key}:${value};`
        })
    return res
}

