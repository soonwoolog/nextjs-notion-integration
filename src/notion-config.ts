export type NotionPageResponse = {
  id: string;
  title: string;
  category: string;
  slug: string;
  date: string;
};

export type NotionBlock = {
  type: string;
  content: string;
};

export type NotionBlockResponse = {
  title: string;
  content: NotionBlock[];
};

export const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
