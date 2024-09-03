/**
 *@param value  值
 *@param isZore 允许为0
 */
export function isNumber(value: any,isZore:boolean = true): boolean {
    console.log("isNumber",value,isZore); 
    if(isNaN(value) || value === null || value === undefined)return false;
    if(!isZore && Number(value) === 0)return false;
    return true;
}   