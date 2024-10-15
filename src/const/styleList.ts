export default {
    'top': {
        descriptions: '相对顶部',
        value: ["auto", "10px", "20px", "30px", "40px", "50px", "..."]
    },
    'left': {
        descriptions: '相对左侧',
        value: ["auto", "10px", "20px", "30px", "40px", "50px", "..."]
    },
    'width': {
        descriptions: '宽度',
        value: ["auto", "100%", "200px", "300px", "400px", "500px", "..."]
    },
    'height': {
        descriptions: '高度',
        value: ["auto", "100%", "200px", "300px", "400px", "500px", "..."]
    },
    'color': {
        descriptions: '颜色',
        value: ["red", "blue", "green", "yellow", "black", "white", "..."]
    },
    'size': {
        descriptions: '字体大小',
        value: ["12px", "14px", "16px", "18px", "20px", "22px", "..."]
    },
    'weight': {
        descriptions: '字体粗细',
        value: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "..."]
    },
    'line-height': {
        descriptions: '行高',
        value: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "..."]
    },
    'letter-spacing': {
        descriptions: '字距',
        value: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "..."]
    },
    'font-family': {
        descriptions: '字体',
        value: ["Arial", "Helvetica", "Tahoma", "Verdana", "Georgia", "Times New Roman", "Courier New", "Lucida Console", "..."]
    },
    'font-size': {
        descriptions: '字体大小',
        value: ["12px", "14px", "16px", "18px", "20px", "22px", "..."]
    },
    'text-decoration': {
        descriptions: '文本装饰',
        value: ["none", "underline", "overline", "line-through", "blink"]
    },
    'text-shadow': {
        descriptions: '文本阴影',
        value: ["none", "x位移 y位移 blur 颜色", "1px 1px 1px #000", "2px 2px 2px #000", "3px 3px 3px #000", "..."]
    },
    'text-overflow': {
        descriptions: '文本溢出',
        value: ["clip", "ellipsis"]
    },
    'white-space': {
        descriptions: '空白处理',
        value: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"]
    },
    'word-break': {
        descriptions: '单词换行',
        value: ["normal", "break-all", "keep-all"]
    },
    'word-wrap': {
        descriptions: '单词包裹',
        value: ["normal", "break-word"]
    },
    'text-align': {
        descriptions: '文本对齐',
        value: ["left", "center", "right", "justify"]
    },
    'vertical-align': {
        descriptions: '垂直对齐',
        value: ["top", "middle", "bottom", "baseline"]
    },
    'background-color': {
        descriptions: '背景颜色',
        value: ["none", "red", "#fffff", "green", "rgb(255,255,255)", "black", "rgba(255,255,255,0.5)", "..."]
    },
    'background-image': {
        descriptions: '背景图片',
        value: ['http://www.example.com/image.jpg.....']
    },
    'background-position': {
        descriptions: '背景位置',
        value: ["x位移 y位移", "0% 0%", "50% 50%", "100% 100%"]
    },
    'background-size': {
        descriptions: '背景尺寸',
        value: ["auto", "cover", "contain"]
    },
    'background-repeat': {
        descriptions: '背景重复',
        value: ["no-repeat", "repeat-x", "repeat-y"]
    },
    'border': {
        descriptions: '边框',
        value: ["none", "边框厚度 边框样式 边框颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'left-border': {
        descriptions: '左边框',
        value: ["none", "边框厚度 边框样式 边框颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'right-border': {
        descriptions: '右边框',
        value: ["none", "边框厚度 边框样式 边框颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'bottom-border': {
        descriptions: '下边框',
        value: ["none", "边框厚度 边框样式 边框颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'top-border': {
        descriptions: '上边框',
        value: ["none", "边框厚度 边框样式 边框颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'border-radius': {
        descriptions: '圆角',
        value: ["0 0 0 0", "左上 右上 左下 右下", "1px 1px 1px 1px", "2px 2px 2px 2px", "3px 3px 3px 3px", "..."]
    },
    'box-shadow': {
        descriptions: '盒子阴影',
        value: ["none", "x位移 y位移 blur 范围 颜色", "1px 2px 1px 10px #000", "2px 2px 2px 1px red", "..."]
    },
    'padding': {
        descriptions: '内边距',
        value: ["0", "10px", "20px", "30px", "40px", "50px", "..."]
    },
    'margin': {
        descriptions: '外边距',
        value: ["0", "10px", "20px", "30px", "40px", "50px", "..."]
    },
    'opacity': {
        descriptions: '透明度',
        value: ["0", "0.5", "1", "..."]
    },
    'cursor': {
        descriptions: '光标',
        value: ["auto", "default", "pointer", "move", "not-allowed", "crosshair", "text", "wait", "help", "progress"]
    },
    'blur': {
        descriptions: '模糊',
        value: ["0", "1px", "2px", "3px", "4px", "5px", "..."]
    },
    'filter': {
        descriptions: '滤镜',
        value: ["none", "blur(5px)", "brightness(0.5)", "contrast(2)", "drop-shadow(16px 16px 20px blue)", "grayscale(1)", "hue-rotate(180deg)", "invert(1)", "opacity(0.5)", "saturate(2)", "sepia(1)"]
    }
} as Record<string,{descriptions:string,value:string[]}>

export const emputyProps = {
    'color': "",
    'size': "",
    'weight': "",
    'line-height': "",
    'letter-spacing': "",
    'font-family': "",
    'font-size': "",
    'text-decoration': "",
    'text-shadow': "",
    'text-overflow': "",
    'white-space': "",
    'word-break': "",
    'word-wrap': "",
    'text-align': "",
    'vertical-align': "",
    'background-color': "",
    'background-image': "",
    'background-position': "",
    'background-size': "",
}