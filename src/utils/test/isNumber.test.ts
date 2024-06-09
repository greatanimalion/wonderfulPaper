function isNumber(value: any,isZore:boolean = true): boolean {
    if(isNaN(value) || value === null || value === undefined)return false;
    if(!isZore && Number(value) === 0)return false;
    return true;
}  
import { test ,expect} from '@jest/globals'
test('isNumber', () => {
  expect(isNumber(1)).toBe(true)
  expect(isNumber('1')).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber(undefined)).toBe(false)
  expect(isNumber({})).toBe(false)
  expect(isNumber([])).toBe(false)
})