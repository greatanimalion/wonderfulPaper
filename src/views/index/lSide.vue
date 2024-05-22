<template>
    <div style="padding: 10px 0;">
       <div style="margin: 10px 3px 20px 3px;text-align: center;">基本网页元素</div> 
        <ul >
            <li><span>按钮</span><div class="baseElement" draggable="true"><button>button</button></div></li>
            <li><span>输入框</span><div class="baseElement"ndraggable="true"><button >input</button></div></li>
            <li><span>多行输入</span><div class="baseElement" draggable="true"><button style="font-size: 12px;">textarea</button></div></li>
            <li><span>H1</span><div class="baseElement" draggable="true"><button draggable="true">h1</button></div></li>
            <li><span>图片</span><div class="baseElement" draggable="true"><button >img</button></div></li>
            <li><span>链接</span><div class="baseElement" draggable="true"><button >a</button></div></li>
            <li><span>div</span><div class="baseElement" draggable="true"><button >盒子</button></div></li>
            <li ><span>按钮</span><div class="baseElement" draggable="true"><button>按钮</button></div></li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss" >
ul{
    height: calc(100VH - 100px);
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width: 8px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #999;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track{
        background-color: #0c0c0c;
    }
}
li{
    span{
        font-size: 14px;
        width: 57px;
        text-align: center;
    }
    margin: 5px 4px;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #4e4e4e;
   
    background-color: #2f2f2f;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;
    &:hover{
        border-color:#2f9ecd ;
    }
    .baseElement{
        cursor:move;
        margin: 4px 0;
        width: 70px;
        padding: 0px;
        overflow: hidden;
    }
}
button{
    width: 100%;
    font-size: 11px;
}
textarea,input{
  height: 30px;
  width: 100%;
  outline: none;
  border: none;
  font-size: 16px;
  
}
</style>