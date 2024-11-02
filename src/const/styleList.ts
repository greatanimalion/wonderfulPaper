export default {
    'top': {
        descriptions: '相对顶部'
    },
    'left': {
        descriptions: '相对左侧'
    },
    'width': {
        descriptions: '宽度'
    },
    'height': {
        descriptions: '高度'
    },
    'color': {
        descriptions: '颜色'
    },
    'size': {
        descriptions: '字体大小'
    },
    'weight': {
        descriptions: '字体粗细'
    },
    'line-height': {
        descriptions: '行高'
    },
    'letter-spacing': {
        descriptions: '字距'
    },
    'font-family': {
        descriptions: '字体'
    },
    'font-size': {
        descriptions: '字体大小'
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
    "outline": {
        descriptions: "轮廓",
        value: ["none", "轮廓宽度 轮廓样式 轮廓颜色", "1px solid #000", "2px dashed #000", "..."]
    },
    'word-break': {
        descriptions: '单词换行',
        value:["normal", "break-all", "keep-all"]
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

    'border': {
        descriptions: '边框',
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
        value: ["0", "10px", "20px", "30px", "..."]
    },
    'opacity': {
        descriptions: '透明度',
        value: ["0", "0.5", "1", "..."]
    },
    'cursor': {
        descriptions: '光标',
        value: ["auto", "default", "pointer", "move", "not-allowed", "crosshair", "text", "wait", "help", "progress"]
    },
    'z-index':{
        descriptions:'层级',
        value:['1']
    }
} as Record<string,{descriptions:string,value?:string[]}>

export const GropsStyleList ={
    'text':{
        'font-size':{descriptions:'字体大小'},
        'font-weight':{descriptions:'字体粗细'},
        'font-family':{descriptions:'字体'},
        'color':{descriptions:'颜色'},
        'line-height':{descriptions:'行高'},
        'letter-spacing':{descriptions:'字距'},
        'text-decoration':{descriptions:'文本装饰',value:["none", "underline", "overline", "line-through", "blink"]},
        'text-shadow':{descriptions:'文本阴影'},
        'text-overflow':{descriptions:'文本溢出',value:["clip", "ellipsis"]},
        'white-space':{descriptions:'空白处理',value:["normal", "nowrap", "pre", "pre-wrap", "pre-line"]},
        'word-break':{descriptions:'单词换行',value:["normal", "break-all", "keep-all"]},
        'word-wrap':{descriptions:'单词包裹',value:["normal", "break-word"]},
        'text-align':{descriptions:'文本对齐',value:["left", "center", "right", "justify"]},
        'vertical-align':{descriptions:'垂直对齐',value:["top", "middle", "bottom", "baseline"]}
    }
}