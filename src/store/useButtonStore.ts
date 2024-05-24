import { defineStore } from "pinia";
import { myButtonProps } from "@/types/button";


const defaultBtn: myButtonProps = {
  backgroundColor: 'black',
  color: 'white',
  height: '50px',
  width: '100px',
  borderRadius: '0px',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '10px',
  border: 'none',
  cursor: 'none',
}
const useButtonStore = defineStore("buttonProps", {
  state: () => defaultBtn,
  getters: {
    getBtnAttrAll(state: any) {
      return () => ({
        backgroundColor: state.backgroundColor,
        color: state.color,
        height: state.height,
        width: state.width,
        borderRadius: state.borderRadius,
        fontSize: state.fontSize,
        fontWeight: state.fontWeight,
        padding: state.padding,
        border: state.border,
        cursor: state.cursor,
      });
    }
  },
  actions: {
    changeBtnAttr(key: keyof myButtonProps, value: string): void {
      this[key] = value;
    },

    recovery(): void {
      this.backgroundColor = 'black';
      this.color = 'white';
      this.height = '50px';
      this.width = '100px';
      this.borderRadius = '0px';
      this.fontSize = '16px';
      this.fontWeight = 'bold';
      this.padding = '10px';
      this.border = 'none';
      this.cursor = 'none';
    },
  },
});
export default useButtonStore;