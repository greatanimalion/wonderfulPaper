/**
 * 由于cssText自动将color值转换为rgb而input的type=color时,value属性只接受hex,所以需要将其转换为hex
 * @param {string} rgb //rgb格式的颜色值
 * @returns {string} hex格式的颜色值
*/
export default function invertRGBtoHex(rgb: string) {
    const reg = /[0-9]\d+/g
    const getArr = rgb.match(reg)||[0,0,0]
    let hexStr = '#' + ((+getArr[0] << 16) | (+getArr[1] << 8) | +getArr[2]).toString(16);
    return hexStr
}