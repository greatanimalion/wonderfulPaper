import { BaseProps } from "./base";
export type Page = {
  title?: string;
  zIndex: number;
  pageElements:HTMLElement[];
  zoom: number|1,
} & BaseProps;
export type PageStore = {
  pageNum: number
  pages: Map<number, Page>
  curIndex: number
}
export type Pagedefault = Omit<Page,'id'|'pageElements'|'zoom'|'resizeHeight'|'resizeWidth'>