export interface Feature {
  id: string;
  name: string;
  category: string;
}

export interface GroupedFeatures {
  [category: string]: Feature[];
}
