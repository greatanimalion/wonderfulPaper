import { defineStore } from 'pinia'
import { Page } from '@/types/page'

type PageStore = {
  pageNum: number
  pages: WeakMap<Number, Page>
}
const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: {}
  } as PageStore),
  actions: {
    /**
     * @param width 页面宽度
     * @param height 页面高度
     * @param zIndex 页面层级(默认1)
     * @param title 页面标题
     */
    createPage({
      width,
      height,
      zIndex = 1,
      title = '',
    }: Page) {
      this.pageNum++;
      let id = this.pageNum
      this.pages.set(id, { id, zIndex, width, height, title,pageElements: [] })
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