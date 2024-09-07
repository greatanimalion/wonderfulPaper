import { BaseProps } from "./base";
export type Page = {
  title?: string;
  zIndex: string;
  pageElements:HTMLElement[];
  zoom: number|1,
} & BaseProps;
export type PageStore = {
  pageNum: number
  pages: Map<string, Page>
  curIndex: number
}
export type Pagedefault = Omit<Page,'id'|'pageElements'|'zoom'|'resizeHeight'|'resizeWidth'>