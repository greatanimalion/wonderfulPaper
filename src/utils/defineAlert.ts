import { ref } from "vue"
import  {messageType}  from '@/types/MessageInfor'

export interface AlertInfo {
    id: string,
    type:messageType,
    message: string,
    title: string
  }
  
  export const newAlert = ref<AlertInfo>({
    id: 'alert' + 0,
    type: 'success',
    message: '',
    title: ''
  })
  
  export const alert = (type:messageType,title: string, message: string) => {
    newAlert.value.id = Math.random().toString()
    newAlert.value.type = type
    newAlert.value.message = message
    newAlert.value.title = title
  }
  
  export default function(type:messageType,title: string, message: string){
    return alert(type, title,message)
  }
  