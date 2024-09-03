export type Page = {
  id: number;
  width: string;
  height: string;
  title?: string;
  content?: string;
  zIndex: string;
  pageElements:HTMLElement[];
  zoom: number|1,
  resizeHeight?: string,
  resizeWidth?: string,
};
export type PageStore = {
  pageNum: number
  pages: Map<string, Page>
  curIndex: Number
}
export type Pagedefault = Omit<Omit<Page,'id'>,'pageElements'>