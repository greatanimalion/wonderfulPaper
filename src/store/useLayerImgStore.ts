import { defineStore } from "pinia";
// import html2canvas from 'html2canvas'

const useLayerThumbnail = defineStore("LayerThumbnail", {
    state: () => ({
        canvas: new Map<number, string>()
    }),
    actions: {
        setLayerThumbnail(currentPageId: number, taraget: HTMLDivElement) {
            let innerThis=this;
            // html2canvas(taraget).then(function (canvas) {
            //     let dataURL=canvas.toDataURL("image/png");
            //     innerThis.canvas.set(currentPageId, dataURL);
            // })
        },
        deleteLayerThumbnail(currentPageId: number) {
            this.canvas.delete(currentPageId);
        }
    }
})
export default useLayerThumbnail;