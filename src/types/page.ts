import { BaseProps } from "./base";
export type Page = {
  id: number;
  title?: string;
  content?: string;
  zIndex: string;
  pageElements:HTMLElement[];
  zoom: number|1,
} & BaseProps;
export type PageStore = {
  pageNum: number
  pages: Map<string, Page>
  curIndex: number
}
export type Pagedefault = Omit<Omit<Omit<Page,'id'>,'pageElements'>,'zoom'>