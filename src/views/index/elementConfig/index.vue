<template>
    <div class="define-event event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <BgColorsOutlined />定义事件
            </v-btn>
        </div>
    </div>
    <div class="modify-style event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <FormOutlined />添加样式
            </v-btn>
        </div>
        
        <div class="modify-style-content">
            <div class="item" v-for="item, index in propsItem" :key="index">
                <v-combobox  style="height: 55px;" :label="item.title" v-model="finalStyle[item.origin]" :items="item.valueItems"></v-combobox>
            </div>
        </div>
    </div>
    <div class="add-animation event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <DeploymentUnitOutlined />添加动画
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
import { FormOutlined, BgColorsOutlined, DeploymentUnitOutlined } from '@ant-design/icons-vue';
import { shallowReactive, shallowRef, watchEffect } from 'vue';
import useVnodeStore from '@/store/useVnodeStore';
import parseCssToObject,{parseObjectToCssText} from '@/utils/parseCssToObject';
import styleSheet,{emputyProps} from '@/const/styleList';
import type {Vnode} from '@/types/Vnode'
const vnodeStore = useVnodeStore();
let propsItem = shallowRef();
let rawStyle = {...emputyProps}
let finalStyle = shallowReactive<Record<string, string>>(rawStyle);
let preVndoe:Vnode|null = null;
watchEffect(() => {
    
    for(let _key in finalStyle){
         //收集依赖
        finalStyle[_key];
    }
    if(!preVndoe)return;
   
    
    preVndoe.style = parseObjectToCssText(finalStyle);
    console.log(preVndoe.style);
    // preVndoe.HTML!.style.cssText = preVndoe.style;
})

watchEffect(() => {
    if (!!vnodeStore.curVnode) {
        preVndoe = vnodeStore.curVnode;
        let cssObject = parseCssToObject(vnodeStore.curVnode!.style);
        cssObject={
            ...cssObject,
            width:vnodeStore.curVnode!.width+'px',
            height:vnodeStore.curVnode!.height.toFixed(1)+'px',
            top:vnodeStore.curVnode!.top+'px',
            left:vnodeStore.curVnode!.left.toFixed(1)+'px'
        }
        propsItem.value = Object.keys(cssObject).map((e) =>{
            finalStyle[e]=cssObject[e]; 
            return {
                origin:e, title:styleSheet[e].descriptions||'未定义',
                value:cssObject[e], valueItems: styleSheet[e].value||['未定义']
            }
        })
    }
    else {
        propsItem.value = []
    };
})

</script>

<style scoped lang="scss">
.modify-style {
    .modify-style-content {
        height: 32vh;
        overflow: auto;
    }
}
.item {
    height: 55px;
}

.event {
    min-height: 34%;
    max-height: 34%;
    text-align: left;
    padding: 3px
}

.event-title {
    font-family: cursive;
    font-size: large;
    text-align: center;
    cursor: default;

    span {
        margin: 0 5px;
    }
}
</style>
