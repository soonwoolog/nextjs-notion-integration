require("dotenv").config();

import { Client, isFullPage, isFullBlock } from "@notionhq/client";
import type { NotionPageResponse, NotionBlock, NotionBlockResponse } from "./notion-config";
import { getContentByKey, dateTimeFormat } from "./notion-helpers";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getNotionPageList(): Promise<NotionPageResponse[]> {
  const query = await notion.databases.query({
    database_id: databaseId as string,
    sorts: [
      {
        property: "date",
        direction: "descending"
      }
    ]
  });

  const response: NotionPageResponse[] = query.results.filter(isFullPage).map(res => {
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

  return response;
}

export async function getNotionPageBySlug(slug: string[]): Promise<NotionBlockResponse> {
  if (!slug) return null;

  const getNotionPageBySlug = await notion.databases.query({
    database_id: databaseId as string,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug.join("/")
      }
    }
  });

  const getIdAndTitle = getNotionPageBySlug.results.filter(isFullPage).map(res => {
    return {
      id: res.id,
      title: getContentByKey(res.properties, "title")
    };
  })[0];

  const list = await notion.blocks.children.list({
    block_id: getIdAndTitle.id
  });

  let blockList: NotionBlock[] = [];

  list.results.filter(isFullBlock).forEach(p => {
    blockList.push({
      type: p.type,
      content: getContentByKey(p, p.type)
    });
  });

  const response: NotionBlockResponse = { title: getIdAndTitle.title, content: blockList };

  return response;
}
