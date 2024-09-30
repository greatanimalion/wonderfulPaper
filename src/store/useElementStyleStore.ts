import { defineStore } from "pinia";


const useElementStyleStore = defineStore("elementStyleStore", {
    state: () => {
        return {
            specialStyle: new Map<number, string>(),
            commonStyle: new Map<string, string>()
            .set('button','background-color: #4e4e4e;width: 70px;height: 25px;color: white;border-radius: 5px;font-size: 16px;cursor: pointer;padding: 0px;')
            .set('input','background-color: #fff;width: 100px;height: 30px;padding: 5px;border: 1px soild #ccc;border-radius: 5px;font-size: 16px;padding: 0px;')
            .set('img','background-color: #4e4e4e;width: 100px;height: 100px;paddin:0px;')
            .set('div','background-color: #4e4e4e;width:50px;height: 50px;border: none;border-radius: 5px;font-size: 16px;padding: 0px;')
        }
    },
    actions: {
        getSpecialElementStyle(el: number) {
            return this.specialStyle.get(el);
        },
        setSpecialElementStyle(el: number, style: string) {
            this.specialStyle.set(el, style);
        },
        deleteSpecailElementStyle(el: number) {
            this.specialStyle.delete(el);
        },
        getCommonElementStyle(el: string) {
            return this.commonStyle.get(el);
        },
        setCommonElementStyle(el: string, style: string) {
            this.commonStyle.set(el, style);
        },
        deleteCommonElementStyle(el: string) {
            this.commonStyle.delete(el);
        },
    }
});
export default useElementStyleStore;