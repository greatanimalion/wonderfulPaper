import useButtonStore from '@/store/useButtonStore';
import {creatUUIDToString} from './creatUUID'; 

export function createButton(): HTMLButtonElement {
  const mybutton = document.createElement('button');
  const buttonStore = useButtonStore()
  let style = buttonStore.getBtnAttrAll()
  for (let i in style) {
    mybutton.style[i as unknown as number] = style[i]
  }
  mybutton.setAttribute('uuid', creatUUIDToString());
  return mybutton;
}

export function createA():HTMLElement  {
  const mya = document.createElement('a')
  mya.setAttribute('uuid', creatUUIDToString())
  return mya
}

/**
 * create element by tag name
 * @param tag string
 */
export default function createElement(tag: string): HTMLElement {
  switch (tag) {
    case 'button':
      return createButton()
    case 'a':
      return createA()
    default:
      return document.createElement(tag)
  }
};