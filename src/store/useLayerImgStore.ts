import { defineStore } from "pinia";
import html2canvas from 'html2canvas'
import { RelativeImg } from '@/types/LayerThumbnail'
const useLayerThumbnail = defineStore("LayerThumbnail", {
    state: () => ({
        canvas: new Map<number, RelativeImg>()
    }),
    actions: {
        setLayerThumbnail(currentPageId: number, img: HTMLImageElement,maxLength:string) {
            let innerThis = this;
            let taraget = document.querySelector(".content") as HTMLElement;
            if (taraget)html2canvas(taraget).then(function (canvas) {
                let dataURL = canvas.toDataURL("image/png");
                innerThis.canvas.set(currentPageId, {src:dataURL, img});
                img.src = dataURL;

                //@ts-ignore
                img.style[maxLength] = '95%';

            })
        },
        deleteLayerThumbnail(currentPageId: number) {
            this.canvas.delete(currentPageId);
        },
        resetLayerThumbnail(currentPageId: number) {
            let img = this.canvas.get(currentPageId)!.img;
            let taraget = document.querySelector(".content") as HTMLElement;
            html2canvas(taraget).then(function (canvas) {
                let dataURL = canvas.toDataURL("image/png");
                img!.src = dataURL;
            })
        }   
    }
})
export default useLayerThumbnail;