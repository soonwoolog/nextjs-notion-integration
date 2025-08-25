export type NotionPageResponse = {
  id: string;
  title: string;
  category: string;
  slug: string;
  date: string;
};

export type NotionText = {
  text: string;
  annotations: any;
};

export type NotionBlock = {
  blockType: string;
  content: NotionText[];
};

export type NotionBlockResponse = {
  title: string;
  blocks: NotionBlock[];
};

export const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
