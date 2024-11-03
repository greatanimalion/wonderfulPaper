let container: HTMLDivElement | null = null
export default function simulateClick(clientX: number, clientY: number) {
    if (!container) return
    container.dispatchEvent(new MouseEvent('click', {
        'clientX': clientX,
        'clientY': clientY,
        'view': window,
        'bubbles': true,
        'cancelable': true,
    }))
}

export function initContainer(containerElement: HTMLDivElement) {
    container = containerElement
}