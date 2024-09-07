import { defineStore } from 'pinia'
import { Page, PageStore, Pagedefault, } from '@/types/page'
import { SubElement } from '@/types/element';
import { message } from 'ant-design-vue';
import debounce from "@/utils/debounce"
const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: new Map<number, Page>(),
    curIndex: -1
  } as PageStore),
  // getters: {
  //   pageList(state): Page[] {
  //     return Array.from(state.pages.values())
  //   },
  //   currentIndex(state): number {
  //     return state.curIndex
  //   },
  //   pageNum(state){
  //     return state.pageNum
  //   },
  //   currentPage(state){
  //     return state.pages.get(state.curIndex)
  //   }
  // },
  actions: {
    getIndexPage(index: number | string): Page | undefined {
      return this.pages.get(Number(index))
    },
    changeCurrentPage(index: number | string) {
      this.curIndex = Number(index)
    },
    getPageNum() {
      return this.pageNum;
    },
    getCurrentPage(): Page | undefined {
      return this.pages.get(this.curIndex)
    },
    createPage(page: Pagedefault) {
      if (this.pages.get(page.zIndex)) { message.error('层级已存在'); return false; }
      if (this.pageNum > 7) { message.error('最多只能创建7个层级'); return false }
      this.pageNum++;
      this.pages.set(page.zIndex, Object.assign(page, { id: (+page.zIndex), pageElements: [], zoom: 1, resizeHeight: page.height, resizeWidth: page.width }))
      this.curIndex = +page.zIndex
      return true
    },
    setZoom(zoom: number) {
      let curPage = this.pages.get(this.curIndex)
      if (!curPage) { return message.error('请创建初始页面') }
      const calculateZoom = curPage.zoom + zoom
      if (calculateZoom < 0.1) { return message.warning('防缩比例不能小于0.1'); }
      curPage.zoom = Number(calculateZoom.toFixed(2))
      curPage.resizeWidth = ((Number(curPage.width) * calculateZoom).toFixed(0))
      curPage.resizeHeight = ((Number(curPage.height) * calculateZoom).toFixed(0))
      debounce(() => {
        this.pages.get(this.curIndex)?.pageElements.forEach((item) => {
          let el = item as unknown as SubElement
          //递归遍历每个节点的子元素，并更新他们的宽高
          let recursion = (element: SubElement) => {
            element.resizeWidth = ((Number(element.width) * calculateZoom).toFixed(0))
            element.resizeHeight = ((Number(element.height) * calculateZoom).toFixed(0))
            if (element.children.length !== 0) {
              element.children.forEach((item) => {
                recursion(item as unknown as SubElement)
              })
            }
          }
          recursion(el)
        })
      }, 300)()
    },
    deletePage(index: number | string) {
      this.pages.delete(Number(index))
      this.pageNum--
    },
  }
})
export default usePageStore