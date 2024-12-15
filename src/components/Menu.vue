<template>
    <ul id="menu-vnode">
        <li @click="addVnode"><div></div><div>创建子节点</div></li>
        <li @click="deleteVnode"><div></div><div>删除节点</div></li>
    </ul>
</template>

<script setup lang="ts">
import useVnodeStroe from '@/store/useVnodeStore'
import Alert from '@/hooks/useAlert';

const VnodeStroe =useVnodeStroe();
function addVnode(e: MouseEvent){ 
    let parentVnode = VnodeStroe.curVnode;
    if(!parentVnode)Alert('info','已默认以根节点创建子节点');    
    VnodeStroe.createSubVnode(parentVnode,{vTop:e.clientY,vLeft:e.clientX,type:'div'});    
}
function deleteVnode(){
    let curVnode = VnodeStroe.curVnode;
    if(!curVnode)return Alert('error','请选择删除节点');
    VnodeStroe.deleteVnode();
}
</script>

<style scoped lang="scss">
#menu-vnode{
    display: none;
}
ul{
    background: #fff;
    border: #e9edf2;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    padding: 5px;
    color: #212930;
    font-size: 15px;
    position: fixed;
    z-index: 99999;
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