import { defineStore } from 'pinia'
import { Page, PageStore, Pagedefault } from '@/types/page'
import { message } from 'ant-design-vue';
import pageDefault from '@/const/pageDefault';

const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: new Map<string, Page>(),
    curIndex: -1
  } as PageStore),
  actions: {
    getIndexPage(index: number | string): Page | null {
      let indexPage = this.pages.get(String(index))
      if (indexPage) {
        return indexPage
      } else {
        return null
      }
    },
    getPageNum() {
      return this.pageNum;
    },
    createPage(page = pageDefault as unknown as Pagedefault) {
      if (this.pages.get(page.zIndex)) { message.error('层级已存在'); return false; }
      if (this.pageNum > 7) { message.warning('最多只能创建7个层级'); return false }
      this.pageNum++;
      let id = this.pageNum
      this.pages.set(String(id), Object.assign(page, { id, pageElements: [] }))
      this.curIndex = id
      return true
    },
    setZoom(index: number | string, zoom: number) {
      this.pages.get(String(index))!.zoom = zoom
    },
    deletePage(index: number | string) {
      this.pages.delete(String(index))
      this.pageNum--
      this.pageNum--;
    },
  }
})
export default usePageStore