<template>
      <div class="v-combo-box">
            <label>{{ label }}:</label>
            <input :type="handleType()" :value="modelValue"  @blur="handleBlur($event)" />
      </div>
</template>

<script setup lang="ts">
import useVnodeStore from '@/store/useVnodeStore';
const vnodeStore=useVnodeStore();
import { useAttrs } from 'vue';
const emit=defineEmits(['update:modelValue'])
let key=useAttrs().keyName as string;
function handleType() {
      if(key=='background-color'||key=='color')return 'color';
      else return 'text';
}
function handleBlur(event: any) {
     if(!vnodeStore.curVnode)return;
     console.log(event.target.value)
      if(key=='height'||key=='width'||key=='left'||key=='top'){
            switch(key){
                  case 'height':
                        vnodeStore.curVnode.height=parseInt(event.target.value)
                        break;
                  case 'width':
                        vnodeStore.curVnode.width=parseInt(event.target.value)
                        break;
                  case 'left':
                        let left=parseInt(event.target.value)
                        vnodeStore.curVnode.left=left
                        vnodeStore.curVnode.absoluteLeft=left
                        break;
                  case 'top':
                        let top=parseInt(event.target.value)
                        vnodeStore.curVnode.top=top
                        vnodeStore.curVnode.absoluteTop=top
                        break;
            }
      }
      //@ts-ignore
      vnodeStore.curVnode.HTML!.style[key]=event.target.value
      emit('update:modelValue',event.target.value)
}

defineProps({
      modelValue: {
            type: String,
            default: ''
      },
      label:{
            type:String,
            default:''
      }
})
</script>

<style scoped lang="scss">
.v-combo-box {
      width: 100px;
      align-items: center;
      width: 240px;
      height: 40px;
      margin: 5px 0;
      overflow: hidden;
      grid-template-columns: 1fr 1fr;
      label {
            font-size: 14px;
            float: left;
            width: 30%;
            text-align: right;
            color: rgb(203, 203, 203);
            line-height: 40px;
            margin-right: 5px;
      }
      input {
            font-size: 16px;
            float: left;
            padding: 5px;
            height: 40px;
            width: 67%;
            border: none;
            padding-left:5px;
            border-radius: 5px;
            background-color: rgb(38, 38, 38);
            color: rgb(218, 218, 218);
            transition: all 0.3s ease;
            &:focus, &:hover {
                  outline: none;
                  background-color: rgb(58, 58, 58)
            }
      }
}
</style>