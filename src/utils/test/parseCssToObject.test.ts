import {expect,test} from 'vitest'
import parseCssToObject from '../parseCssToObject'
test('parseCssToObject', () => {
  expect(parseCssToObject('color:red;font-size:16px;')).to.deep.equal({
    color:'red',
    'fontSize': '16px'
  })
})