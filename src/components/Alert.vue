<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { type AlertInfo, newAlert } from '@/utils/defineAlert'
import { SuccessIcon, ErrorIcon, InforIcon, WarningIcon } from '@/const/SvgIcon';
import { messageType } from '@/types/MessageInfor'
const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InforIcon
}
const colors = {
  success: '#67AD5B',
  error: '#FF5722',
  warning: '#FFC107',
  info: '#909399'
}
// 定义 Map，存储Alert信息集合，使用Map便于删除
const alertMap = ref<Map<string, AlertInfo>>(new Map)
let alert: messageType
watch(newAlert.value, () => {
  alertMap.value.set(newAlert.value.id, { ...newAlert.value })
  deleteAlert(newAlert.value.id)
  alert = newAlert.value.type
})

const deleteAlert = (id: string) => {
  setTimeout(() => {
    alertMap.value.delete(id)
  }, 3500)
}

onBeforeMount(() => {
  let messageContent = document.createElement('div')
  messageContent.id = 'messageContent'
  messageContent.style.position = 'fixed'
  messageContent.style.top = '5%'
  messageContent.style.left = '50%'
  messageContent.style.transform = 'translateX(-50%)'
  messageContent.style.width = '250px'
  messageContent.style.zIndex = '9999'
  document.documentElement.appendChild(messageContent)
})

</script>


<template>
  <Teleport to="#messageContent">
    <div v-for="(alert, index) in Array.from(alertMap.values())" class="modal" :key="index" :style="{ backgroundColor: colors[alert.type] }">
      <div class="icon" v-html="icons[alert.type]"></div>
      <p>{{ alert.message }}</p>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  border-radius: 5px;
  width: 250px;
  padding: 10px;
  font-size: 15px;
  margin-top: 10px;
  text-align: center;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: down 0.3s;
}

@keyframes down {
  0% {
    transform: translateY( -30px);
  }

  100% {
    transform: translateY( 0);
  }
}

p {
  height: 20px;
  line-height: 20px;
}

.icon {
  float: left;
}

.icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
</style>
