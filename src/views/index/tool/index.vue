<template>
    <div class="tool-bar">
        <div>
            <Tooltip title="更多">
                <UnorderedListOutlined style="font-size: 25px;" />
            </Tooltip>
        </div>
        <div>
            <Tooltip title="撤销">
                <RollbackOutlined style="font-size: 25px;"/>
            </Tooltip>
        </div>
        <div>
            <Tooltip title="恢复">
                <RetweetOutlined style="font-size: 25px;"  />
            </Tooltip>
        </div>
        <div>
            <Tooltip title="拖拽">
                <DragOutlined style="font-size: 25px;" />
            </Tooltip>
        </div>
        <a-popover placement="bottomRight">
            <template #content>
                <div class="user-options">
                    <div>
                        <a-button type="primary" @click="showModal">登录</a-button>
                        <a-modal v-model:open="open" title="感谢您的使用！！！" @ok="handleOk">
                            <p>作者是个乡里来的学生，家里比较贫穷，所以暂时无法买到服务器，还请见谅。</p>
                            <p>如果您认为这个网站对您的有帮助，欢迎给我打赏(一分也是万分感谢，我会记录每一个帮助的人！)，您的支持是我前进的动力。</p>
                            <p>如果遇到什么问题可以联系我，我会尽快回复。QQ:2239765270</p>
                            <p>
                                <img :src="img" alt="微信支付" style="width: 200px;" />
                                <img :src="img2" alt="支付宝" style="width: 170px; margin-left: 50px" />
                            </p>
                        </a-modal>
                    </div>
                </div>
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

import img from '@/assets/img.png'
import img2 from '@/assets/img2.jpg'


import { ref } from 'vue';
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
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