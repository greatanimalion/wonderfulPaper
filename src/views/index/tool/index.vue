<template>
    <div class="tool-bar">
        <div>
            <Tooltip title="更多"><UnorderedListOutlined style="font-size: 25px;" /></Tooltip>
        </div>
        <div>
           <Tooltip title="撤销"><RollbackOutlined style="font-size: 25px;" @click="revocation()" /></Tooltip>
        </div>
        <div>
           <Tooltip title="恢复"><RetweetOutlined style="font-size: 25px;" @click="reinstatement()" /></Tooltip>
        </div>
       
        <div>
            <Tooltip title="拖拽"><DragOutlined style="font-size: 25px;" /></Tooltip>   
        </div>
        <a-popover placement="bottomRight">
            <template #content>
                <div class="user-options">登录</div>
                <div class="user-options">退出</div>
            </template>
            <a-avatar :size="40" style="float: right;margin:14px ; cursor: pointer;">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
        </a-popover>
    </div>

</template>

<script setup lang="ts">
import { UnorderedListOutlined, DragOutlined, UserOutlined, RollbackOutlined, RetweetOutlined } from '@ant-design/icons-vue';
import Tooltip from '@/components/Tooltip.vue';
import RevocationAndReinstatement from '@/utils/RevocationAndReinstatement';
const { revocation, reinstatement } = RevocationAndReinstatement;

</script>

<style scoped>
.tool-bar {
    padding: 0 5px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tool-bar>div {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    transition: all 0.3s;
}

.tool-bar>div:hover {
    background-color: #f5f5f5;
}

.user-options {
    text-align: center;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    width: 100px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.user-options:hover {

    background-color: #f5f5f5;
}
</style>