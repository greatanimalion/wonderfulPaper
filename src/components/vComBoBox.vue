<template>
      <div class="v-combo-box">
            <span>{{ label }}:</span>
            <input :type="handleType(key)" :value="modelValue" @blur="($event:any)=>{
                  handleBlur($event.target.value,key);}" />
      </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { useBlur,useType } from '@/hooks/useBlur';
const handleBlur = useBlur();
const handleType = useType();
let key = useAttrs().keyName as string;
defineProps({
      modelValue: {
            type: String,
            default: ''
      },
      label: {
            type: String,
            default: ''
      }
})
</script>

<style scoped lang="scss">
.v-combo-box {
      width: 240px;
      height: 30px;
      margin: 5px 0;
      span {
            font-size: 14px;
            float: left;
            width: 30%;
            text-align: right;
            color: rgb(203, 203, 203);
            line-height: 30px;
            margin-right: 5px;
      }
      input {
            font-size: 14px;
            float: left;
            padding: 1px;
            height: 30px;
            width: 67%;
            border: none;
            padding-left: 5px;
            border-radius: 5px;
            background-color: #1a1a1a;
            color: rgb(218, 218, 218);
            transition: all 0.3s ease;
            &:focus,
            &:hover {
                  outline: none;
                  background-color: rgb(58, 58, 58)
            }
      }
}
</style>