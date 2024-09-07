/**
 *@param value  值
 *@param isZore 允许为0
 *@param positive 是否为正数
 */
export function isNumber(value: any,isZore:boolean = true,positive:boolean = false): boolean {
    if(isNaN(value) || value === null || value === undefined)return false;
    if(!isZore && Number(value) === 0)return false;
    if(positive)return Number(value) > 0;
    return true;
}   