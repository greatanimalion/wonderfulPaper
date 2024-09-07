export function parseCss(css: string,options:string[]):Record<string,string> {
    let res:Record<string,string>={} 
    css.split(';').forEach(line=>{ 
        if(line.trim()=='')return 
        let [key,value]=line.split(':')
        if(options.includes(key.trim())){
            res[key]=value.trim()
        }
    })
    return res;
}