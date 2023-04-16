export interface ISite {
  id: string;
  title: string;
  url: string;
  results: string[];
  updatedAt: string;
  selector?: string;
  selectorTemplate?: string;
}
