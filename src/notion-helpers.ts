import { BlockObjectResponse } from "@notionhq/client";
import { dateFormatOption } from "./notion-config";

export function dateTimeFormat(datetime: string) {
  return new Intl.DateTimeFormat("en-US", dateFormatOption).format(new Date(datetime));
}

function getText(arr: string[]) {
  return arr.map((p: any) => p.plain_text).join("");
}

export function getContentByKey(props: any, key: string): string {
  const prop = props?.[key];
  const type = prop?.type ?? props?.type;

  switch (type) {
    case "title":
      return getText(prop.title);
    case "rich_text":
      return getText(prop.rich_text);
    case "select":
      return prop.select.name;
    case "heading_1":
      return getText(props.heading_1.rich_text);
    case "bulleted_list_item":
      return getText(props.bulleted_list_item.rich_text);
    default:
      return "";
  }
}

export function formatBlockData(props: BlockObjectResponse) {
  switch (props.type) {
    case "heading_1":
      return props.heading_1;
    case "heading_2":
      return props.heading_2;
  }
}
