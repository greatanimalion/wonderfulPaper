import { defineStore } from 'pinia'
import { Page } from '@/types/page'
// import { message } from 'ant-design-vue';
type PageStore = {
  pageNum: number
  pages: Map<string, Page>
  curIndex: Number
}

const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: new Map<string, Page>(),
    curIndex: -1
  } as PageStore),
  actions: {
    /**
     * @param width 层级宽度
     * @param height 高度
     * @param zIndex 层级级别(默认1)
     * @param title 层级标题
     */
    getIndexPage(index: number|string): Page | null {
      let indexPage = this.pages.get(String(index))
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
      if(this.pages.get(zIndex))return false;
      this.pageNum++;
      let id = this.pageNum
      this.pages.set(String(id), { id, zIndex, width, height, title,pageElements: [] })
      this.curIndex = id
      return true
    },
    /**
     * @param index 要删除的页码
     */
    deletePage(index: number|string) {
      this.pages.delete(String(index))
      this.pageNum--
    },
  }
})
export default usePageStore