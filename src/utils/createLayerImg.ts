/**
 * 给定一个目标元素，将目标元素变成img,当页面删除时，请尽可能的将revokeObjectUrl撤销，避免内存泄漏
 * @param e 目标元素
 * @returns img的src
*/
export  default function createCanvas(e: HTMLDivElement) {
    console.log(e);
    
    let data = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
                ${e.innerHTML}
            </div>
        </foreignObject>
    </svg>
    `
    let svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    let url = window.URL.createObjectURL(svg);
    return url
}

/*
内存管理
每次调用 createObjectURL() 时，都会创建一个新的对象 URL，即使已经为同一个对象创建了一个 URL。当不再需要这些对象时，必须通过调用 URL.revokeObjectURL() 来释放它们。

浏览器会在卸载文档时自动释放对象 URL；然而，为了优化性能和内存使用，如果在安全时间内可以明确卸载，就应该卸载。
*/