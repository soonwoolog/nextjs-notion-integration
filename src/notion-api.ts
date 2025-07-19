require("dotenv").config();

import { Client, isFullPage, isFullBlock } from "@notionhq/client";
import { NotionPageResponse } from "./notion-config";
import { getContentByKey, dateTimeFormat } from "./notion-helpers";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getNotionPageList(): Promise<NotionPageResponse[]> {
  const response = await notion.databases.query({
    database_id: databaseId as string,
    sorts: [
      {
        property: "date",
        direction: "descending"
      }
    ]
  });

  const results: NotionPageResponse[] = response.results.filter(isFullPage).map(res => {
    const title = getContentByKey(res.properties, "title");
    const category = getContentByKey(res.properties, "category");
    const slug = getContentByKey(res.properties, "slug");

    return {
      id: res.id,
      title: title,
      category: category,
      slug: slug,
      date: dateTimeFormat(res.last_edited_time)
    };
  });

  return results;
}

export const getNotionPageBySlug = async (slug: string[]) => {
  if (!slug) return [];

  const findId = await notion.databases.query({
    database_id: databaseId as string,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug.join("/")
      }
    }
  });

  const response = await notion.blocks.children.list({
    block_id: findId.results[0].id
  });

  const results = response.results.filter(isFullBlock).map(p => {
    return {
      type: p.type,
      content: getContentByKey(p, p.type)
    };
  });

  return results;
};
