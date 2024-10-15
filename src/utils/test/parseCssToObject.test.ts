import {expect,test} from 'vitest'
import parseCssToObject, {parseObjectToCssText} from '../parseCssToObject'
test('parseCssToObject', () => {
  expect(parseCssToObject('color:red;font-size:16px;')).to.deep.equal({
    color:'red',
    'fontSize': '16px'
  })
})
test('parseObjectToCssText', () => {
  expect(parseObjectToCssText({'height':'10px','width':'20px!important'})).to.equal('height:10px;width:20px!important')
})  