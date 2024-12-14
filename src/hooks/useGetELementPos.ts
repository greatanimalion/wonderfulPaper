export default function useGetElementPos(element: HTMLDivElement) {
    const conatianer=document.querySelector<HTMLDivElement>('operateContent')
    if(!conatianer){console.error("容器未定义");return {screenX:0,screenY:0}}
    const screenX=element.offsetLeft-conatianer.offsetLeft-conatianer.scrollLeft;
    const screenY=element.offsetTop-conatianer.offsetTop-conatianer.scrollTop;
    return {screenX,screenY}
}