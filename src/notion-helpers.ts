import { dateFormatOption, NotionBlock } from "./notion-config";

export function dateTimeFormat(datetime: string) {
  return new Intl.DateTimeFormat("en-US", dateFormatOption).format(new Date(datetime));
}

function joinText(arr: string[]) {
  return arr.map((p: any) => p.plain_text).join("");
}

export function getTextByKey(props: any, key: string): string {
  const prop = props?.[key];
  const type = prop?.type ?? props?.type;

  switch (type) {
    case "title":
      return joinText(prop.title);
    case "rich_text":
      return joinText(prop.rich_text);
    case "select":
      return prop.select.name;
    default:
      return "";
  }
}

export function getBlockByKey(props: any, key: string): NotionBlock {
  const blockType = props?.type ?? key;
  const block = props?.[blockType];

  const richTexts = block?.rich_text ?? [];

  return {
    blockType,
    content: richTexts.map((r: any) => ({
      text: r.plain_text ?? "",
      annotations: r.annotations ?? {}
    }))
  };
}
