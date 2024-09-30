<template>
    <ul id="menu-vnode">
        <li @click="addVnode"><div></div><div>创建子节点</div></li>
        <li><div></div><div>删除节点</div></li>
    </ul>
</template>

<script setup lang="ts">
import useVnodeStroe from '@/store/useVnodeStore'
import { message } from 'ant-design-vue';
const VnodeStroe =useVnodeStroe();
function addVnode(e: MouseEvent){ 
    let parentVnode = VnodeStroe.curVnode;
    if(!parentVnode)return message.error('请选择父节点');
    if(parentVnode)VnodeStroe.createSubVnode(parentVnode,{top:e.clientY,left:e.clientX});
}
</script>

<style scoped lang="scss">
ul{
    background: #fff;
    border: #e9edf2;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    padding: 5px;
    color: #212930;
    font-size: 15px;
    position: fixed;
    z-index: 9;
    width: 150px;
    li{
        margin-bottom: 2px;
        list-style: none;
        padding: 4px 20px;
        display: flex;
        cursor: pointer;
        border-radius: 5px;
    }
    li:hover{
        background-color: #e5e5e5;
    }

}
</style>