<template>
    <div class="tool-bar">
            <Tooltip title="更多">
                <UnorderedListOutlined style="font-size: 25px;" />
            </Tooltip>
            <Tooltip title="撤销">
                <RollbackOutlined style="font-size: 25px;"/>
            </Tooltip>

            <Tooltip title="恢复">
                <RetweetOutlined style="font-size: 25px;"  />
            </Tooltip>

            <Tooltip title="拖拽">
                <DragOutlined style="font-size: 25px;" />
            </Tooltip>       
            <Tooltip title="添加节点" @click.native="handleClick('addNode')" >
                <PlusSquareOutlined style="font-size: 25px;"  />
            </Tooltip>
    </div>
</template>

<script setup lang="ts">
import { UnorderedListOutlined, DragOutlined, RollbackOutlined, RetweetOutlined ,PlusSquareOutlined} from '@ant-design/icons-vue';
import Tooltip from '@/components/Tooltip.vue';

import usePageStore from '@/store/usePageStore';
import Alert from '@/hooks/useAlert'

const pageStore = usePageStore();
const handleClick = (type: string) => {
    if (type === 'addNode') {
        if(!pageStore.created)return Alert('error','请先创建页面！')
        pageStore.openVnodePage()
    }
}

</script>

<style scoped>
.tool-bar {
    padding: 0 5px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bj-color);
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
    background-color: #5e5e5e;
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