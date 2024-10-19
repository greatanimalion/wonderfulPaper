<template>
      <div class="v-combo-box">
            <label>{{ label }}:</label>
            <input :type="handleType(key)" :value="modelValue" @blur="($event:any)=>{
                  handleBlur($event.target.value,key);
                  emit('update:modelValue', $event.target.value);}" />
      </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { useBlur,useType } from '@/hooks/useBlur';
const emit = defineEmits(['update:modelValue'])
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
            padding-left: 5px;
            border-radius: 5px;
            background-color: rgb(38, 38, 38);
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