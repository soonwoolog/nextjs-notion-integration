export type NotionPageResponse = {
  id: string;
  title: string;
  category: string;
  slug: string;
  date: string;
};

export const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
