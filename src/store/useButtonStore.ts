import { defineStore } from "pinia";
import { myButtonProps } from "@/types/button";


const defaultBtn: myButtonProps = {
  background_color:'black',
  color:'white',
  height:'50px',
  width:'100px',
  border_radius:'0px',
  font_size:'16px',
  font_weight:'bold',
  padding:'10px',
  border:'none',
  cursor:'none',
}
const useButtonStore = defineStore("buttonProps", {
  state: () => defaultBtn,
  actions: {
    changeBtnAttr(key: keyof myButtonProps,value:string):void{
      this[key] = value;
    },
    get getDefaultBtn(): myButtonProps {return defaultBtn},
    recovery():void {
        this.background_color='black';
        this.color='white';
        this.height='50px';
        this.width='100px';
        this.border_radius='0px';
        this.font_size='16px';
        this.font_weight='bold';
        this.padding='10px';
        this.border='none';
        this.cursor='none';
    },
  },
});
export default useButtonStore;