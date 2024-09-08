declare interface HTMLElement {
    childNodes: {
        forEach: (callback: (child: HTMLElement) => void) => void
        length: number  
    };
    style:{
        top: string
        left: string
    }
}

/**
 * 对目标元素的所有子元素进行缩放处理
*/
export default function subElementZoom(element: HTMLElement, zoom: number) {
    element.childNodes.forEach((child) => {
        child.style.top=(+child.style.top.replace('px','')*zoom)*zoom+'px'
        child.style.left=(+child.style.left.replace('px','')*zoom)*zoom+'px'
        if(child.childNodes.length>0)subElementZoom(child, zoom)
    })
}