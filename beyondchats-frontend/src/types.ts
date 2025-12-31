export interface Reference {
  title: string;
  url: string;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  updatedContent?: string;
  references?: Reference[];
  isUpdated: boolean;
}
