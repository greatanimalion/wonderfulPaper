export type Page = {
  id: number;
  width: number;
  height: number;
  title?: string;
  content?: string;
  zIndex: number;
  pageElements:HTMLElement[];
};