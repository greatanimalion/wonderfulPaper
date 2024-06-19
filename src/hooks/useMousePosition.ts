/**
 * 获取鼠标位置，受放大倍数影响
 * @param element 要获取鼠标位置的元素
 * @param object 要存储鼠标位置的对象
 * @param DPR 放大倍数(默认1)
*/
export default function useMousePosition(element: HTMLBaseElement, object: { x: number, y: number }, DPR: number = 1) {
    if (DPR <= 0) throw new Error('放大倍数必须大于0')
    const handleMouseMove = (event: MouseEvent) => {
        object.x = event.offsetX / DPR
        object.y = event.offsetY / DPR
    }
    element.addEventListener('mousemove', handleMouseMove)
    function removeMouseListener() {
        element.removeEventListener('mousemove', handleMouseMove)
    }

    return removeMouseListener
}