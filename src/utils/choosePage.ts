let Page=null;
export function choosePage(Page: number): Function {
    if(!Page){
        return function() {}
    }
    else return function(config: any): void {
        
    }

}