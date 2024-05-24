import useButtonStore from '@/store/useButtonStore';
import { creatUUID } from './creatUUID';
export function createButton(): HTMLButtonElement {
  const mybutton = document.createElement('button');
  const buttonStore = useButtonStore()
  let style = buttonStore.getBtnAttrAll()
  for (let i in style) {
    mybutton.style[i as unknown as number] = style[i]
  }
  mybutton.setAttribute('uuid', creatUUID() + "");
  return mybutton;
}

export function createA():HTMLElement  {
  return document.createElement('a')
}


export default function createElement(tag: string): HTMLElement {
  switch (tag) {
    case 'button':
      return createButton()
    case 'button':
      return createA()
    default:
      return document.createElement(tag)
  }
};