<template>
    <div style="padding: 10px 0;">
       <div style="margin: 10px 3px 20px 3px;">基本网页元素</div> 
        <ul>
            <li draggable="true"><span>button</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>input</span><div class="baseElement"><input placeholder="输入框" /></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
            <li draggable="true"><span>按钮</span><div class="baseElement"><button>按钮</button></div></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss" >
li{
    margin: 5px 2px;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #4e4e4e;
    cursor:grab;
    background-color:transparent;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;
    &:hover{
        border-color:#2f9ecd ;
    }
    .baseElement{
        margin: 4px
    }
}
input{
    width: 50px;
    outline: none;
    border: none;
    font-size: 16px
}
</style>