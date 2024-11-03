export default {
    'color': {
        descriptions: '颜色'
    },
    'font-size': {
        descriptions: '字体大小'
    },
    'font-weight': {
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
    },

    'border': {
        descriptions: '边框',
    },
    'border-radius': {
        descriptions: '圆角',
    },
    'box-shadow': {
        descriptions: '盒子阴影',
    },
    'padding': {
        descriptions: '内边距',
    },
    'margin': {
        descriptions: '外边距',
    },
    'opacity': {
        descriptions: '透明度',
    },
    'cursor': {
        descriptions: '光标',
        value: ["auto", "default", "pointer", "move", "not-allowed", "crosshair", "text", "wait", "help", "progress"]
    },
    'z-index':{
        descriptions:'层级',
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