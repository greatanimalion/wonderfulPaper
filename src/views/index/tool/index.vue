<template>
    <div style="height: 64px;">
        <a-button type="primary" size="large">创建基本页面</a-button>
        <a-popover placement="bottomRight">
            <template #content>
              <div class="user-options">登录</div>
              <div class="user-options">退出</div>
            </template>
            <a-avatar :size="40" style="float: right;margin:10px ; cursor: pointer;">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
        </a-popover>
    </div>

</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
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