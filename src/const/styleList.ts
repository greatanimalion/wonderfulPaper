import { type Sample } from "@/types/StyleItem"
export default {
    'font-size': { 'descriptions': '字体大小' },
    'vertical-align': { 'descriptions': '垂直对齐' },
    'font-weight': { 'descriptions': '字体粗细' },
    'font-family': { 'descriptions': '字体' },
    'color': { 'descriptions': '字体颜色' },
    'line-height': { 'descriptions': '行高' },
    'word-break': { 'descriptions': '单词换行' },
    'word-wrap': { 'descriptions': '单词包裹', },
    'background-color': { 'descriptions': '背景颜色' },
    'letter-spacing': { 'descriptions': '字距' },
    'margin': { 'descriptions': '外边距' },
    'border-radius': { 'descriptions': '圆角' },
    'text-shadow': { 'descriptions': '文本阴影' },
    'z-index': { 'descriptions': '层级' },
    'position': {
        'descriptions': '定位',
        'list': [
            {
                'description': "相对定位",
                'value': "relative"
            }, {
                'description': "绝对定位",
                'value': "absolute"
            },]
    },
    'display': {
        'descriptions': '显示方式',
        'list': [
            {
                'description': "块级元素",
                'value': "block"
            }, {
                'description': "功能布局",
                'value': "flex"
            }]
    },
    'text-decoration': {
        'descriptions': '文本装饰',
        'list': [
            {
                'description': "无",
                'value': "none"
            }, {
                'description': "下划线",
                'value': "underline"
            }, {
                'description': "上划线",
                'value': "overline"
            }, {
                'description': "删除线",
                'value': "line-through"
            }
        ]
    },
    'text-overflow': {
        'descriptions': '文本溢出',
        'list': [{
            'description': "裁剪",
            'value': "clip"
        }, {
            'description': "省略号",
            'value': "ellipsis"
        }]
    },
    'white-space': {
        'descriptions': '空白处理',
        'list': [
            {
                'description': "正常",
                'value': "normal"
            }, {
                'description': "不换行",
                'value': "nowrap"
            }
        ]
    },
    'text-align': {
        'descriptions': '文本对齐',
        'list': [{
            'description': "左对齐",
            'value': "left"
        }, {
            'description': "居中",
            'value': "center"
        }, {
            'description': "右对齐",
            'value': "right"
        }]
    },
} as Omit<Sample, 'value'>