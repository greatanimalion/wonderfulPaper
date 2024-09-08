import { BaseProps } from "./base";
import { SubElement } from "./element";
export type Page = {
  title?: string;
  zIndex: number;
  children:SubElement[];
  zoom: number|1,
} & BaseProps;
export type PageStore = {
  pageNum: number
  pages: Map<number, Page>
  curIndex: number
}
export type Pagedefault = Omit<Page,'id'|'children'|'zoom'|'resizeHeight'|'resizeWidth'>