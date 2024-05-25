<template>
    <div style="padding: 10px 0;">
        <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">基本网页元素</div>
        <ul class="baseElementsUL" ref="baseElementsUL">
            <li>
                <span>按钮</span>
                <div class="baseElement" draggable="true"><button mytype="button">button</button></div>
            </li>
            <li>
                <span>输入框</span>
                <div class="baseElement" draggable="true"><button mytype="input">input</button></div>
            </li>
            <li>
                <span>多行输入</span>
                <div class="baseElement" draggable="true"><button style="font-size: 12px;" mytype="textarea">textarea</button></div>
            </li>
            <li>
                <span>{{ Hn }}</span>
                <div class="baseElement" draggable="true">
                    <a-popover placement="rightTop" :overlayStyle="{width:'100px'}" >
                        <template #content >
                            <p v-for="i in 6" > <a-button @click="Hn='h'+i" mytype="h{{ i }}">h{{ i }}</a-button></p>
                        </template>
                        <template #title>
                            <span>型号</span>
                        </template>
                        <button>{{ Hn }}</button>
                    </a-popover>
                </div>
            </li>
            <li>
                <span>图片</span>
                <div class="baseElement" draggable="true"><button mytype="img">img</button></div>
            </li>
            <li>
                <span>链接</span>
                <div class="baseElement" draggable="true"><button mytype="a">a</button></div>
            </li>
            <li>
                <span>盒子</span>
                <div class="baseElement" draggable="true"><button mytype="div">div</button></div>
            </li>
            <li>
                <span>按钮</span>
                <div class="baseElement" draggable="true"><button mytype="button">按钮</button></div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useDraggingElement from "@/store/useDraggingElement"

const draggingElement=useDraggingElement()
const baseElementsUL = ref(null)
const Hn=ref("h(n)")

onMounted(() => {   
   (baseElementsUL.value as unknown as HTMLElement).addEventListener('dragstart', (e: DragEvent ) => {
      draggingElement.setDraggingElement(((e.target as HTMLElement).querySelector('button') as HTMLButtonElement).innerHTML);
      console.log(((e.target as HTMLElement).querySelector('button') as HTMLButtonElement).innerHTML);
      
   });
   (baseElementsUL.value as unknown as HTMLElement).addEventListener('dragend', () => {
      draggingElement.clearDraggingElement()
   });
})

</script>

<style scoped lang="scss">
ul {
    height: calc(100VH - 100px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #0c0c0c;
    }
}

li {
    span {
        font-size: 14px;
        width: 57px;
        text-align: center;
    }
    color: wheat;
    margin: 5px 4px;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #4e4e4e;

    background-color: #2d2d2d;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;

    &:hover {
        border-color: #2f9ecd;
    }

    .baseElement {
        cursor: move;
        margin: 4px 0;
        width: 70px;
        padding: 0px;
        overflow: hidden;
    }
}

button {
    width: 100%;
    font-size: 11px;
    color: #ec9f9f;
    background-color: #4e4e4e;
}

textarea,
input {
    height: 30px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;

}
.h{
    width: 100px;
}
</style>