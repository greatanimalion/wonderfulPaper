<template>
    <div class="tool-bar">
            <TableOutlined />
            <DragOutlined />     
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
import { TableOutlined , DragOutlined,UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.tool-bar {
    transition: all 0.3s;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.tool-bar:hover {
    background-color: #f5f5f5;}
.user-options {
    text-align: center;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;width:100px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.user-options:hover {

    background-color: #f5f5f5;
}
</style>