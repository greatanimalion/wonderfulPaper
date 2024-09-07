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


