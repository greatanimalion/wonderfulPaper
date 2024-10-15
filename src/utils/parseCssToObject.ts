/**
 * 解析css样式，返回一个对象,对象的属性为驼峰命名法的样式名，值为样式值
 * @param css 样式字符串
 * 
*/

export default function parseCss(css: string):Record<string,string> {
    let res:Record<string,string>={} 
    css.split(';').forEach(line=>{ 
        if(line.trim()=='')return 
        let [key,value]=line.split(':')
        let keycamel=key.replace(/-(\w)/g,function(_all,letter){
            return letter.toUpperCase()
        })
        res[keycamel.trim()]=value.trim()
    })
    return res;
}


