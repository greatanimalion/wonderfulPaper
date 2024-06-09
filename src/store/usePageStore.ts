import { defineStore } from 'pinia'
import { Page } from '@/types/page'

type PageStore = {
  pageNum: number
  pages: Map<Number, Page>
  curIndex: Number
}
const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: new Map<Number, Page>(),
    curIndex: -1
  } as PageStore),
  actions: {
    /**
     * @param width 页面宽度
     * @param height 页面高度
     * @param zIndex 页面层级(默认1)
     * @param title 页面标题
     */
    getIndexPage(index: number): Page | null {
      let indexPage = this.pages.get(index)
      if (indexPage) {
        return indexPage
      } else {
        return null
      }
    },
    createPage({
      width,
      height,
      title = '',
      zIndex = "1" 
    }:{
      width:string,
      height:string,
      title:string ,
      zIndex:string,
    }) {
      this.pageNum++;
      let id = this.pageNum
      this.pages.set(id, { id, zIndex, width, height, title,pageElements: [] })
      this.curIndex = id
    },
    /**
     * @param index 要删除的页码
     */
    deletePage(index: number) {
      this.pages.delete(index)
      this.pageNum--
    },
  }
})
export default usePageStore