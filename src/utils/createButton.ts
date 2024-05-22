import useButtonStore from '@/store/useButtonStore';
export function createButton(text?: string): HTMLButtonElement {
  const button = document.createElement('button');
  console.log(useButtonStore());
  console.log(11);
  
  return button;
}