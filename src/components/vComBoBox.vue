<template>
      <div class="v-combo-box">
            <span>{{ZHname }}:</span>
            <input v-if="list.length ==0"  :type="handleType(ENname)" :value="modelValue" @blur="blur" />
            <Selection v-else  :change="change" :value="modelValue" :items="list"/>
      </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { useBlur, useType } from '@/hooks/useBlur';
import Selection from '@/components/Selection.vue';

//处理不同类型的数据以展现不同效果
let ENname = useAttrs().ENname as string;
const handleBlur = useBlur();
const handleType = useType();
function blur(event: any) {
      handleBlur(event.target.value, ENname)
}
function change(value: string) {
      handleBlur(value, ENname)
}
defineProps({
      modelValue: {
            type: String,
            default: ''
      },
      list:{
            type: Array<{
                  description: string,
                  value: string
            }>,
            default:[]
      },
      ZHname:{
            type: String,
            default: '1'
      }
})
</script>

<style scoped lang="scss">
.v-combo-box {
      width: 240px;
      height: 30px;
      margin: 5px 0;
      display: flex;
      span {
            font-size: 14px;
            width: 40%;
            text-align: center;
            color: rgb(203, 203, 203);
            line-height: 30px;
            margin-right: 5px;
      }
      input{
            font-size: 14px;
            height: 30px;
            width: 60%;
            border: none;
            border-radius: 3px;
            background-color: #1a1a1a;
            color: rgb(218, 218, 218);
            transition: all 0.3s ease;
            text-align: center;
            &:focus,
            &:hover {
                  outline: none;
                  background-color: rgb(58, 58, 58)
            }
      }
}
</style>