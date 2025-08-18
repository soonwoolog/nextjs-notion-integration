import { Client, isFullPage, isFullBlock } from "@notionhq/client";
import type { NotionPageResponse, NotionBlock, NotionBlockResponse } from "./notion-config";
import { getContentByKey, dateTimeFormat } from "./notion-helpers";

let notion: Client | null = null;
let databaseId: string | null = null;
let initialized = false;

function logAndThrow(message: string): never {
  console.error(message);
  throw new Error(message);
}

export function init(key: string, id: string) {
  if (initialized) return;

  if (!key || !id) logAndThrow("API Key or database ID is missing.");

  notion = new Client({ auth: key });
  databaseId = id;
  initialized = true;
}

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
  try {
    if (!notion || !databaseId) logAndThrow("Notion client or database ID is not initialized.");

    const notionPageBySlug = await notion.databases.query({
      database_id: databaseId as string,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug.join("/")
        }
      }
    });

    if (!notionPageBySlug.results.length) {
      logAndThrow(`No page found for ${slug.join(" / ")}`);
    }

    const page = notionPageBySlug.results.filter(isFullPage).map(res => {
      return {
        id: res.id,
        title: getContentByKey(res.properties, "title")
      };
    })[0];

    const children = await notion.blocks.children.list({
      block_id: page.id
    });

    const blockList: NotionBlock[] = children.results.filter(isFullBlock).map(p => ({
      type: p.type,
      content: getContentByKey(p, p.type)
    }));

    return { title: page.title, content: blockList };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
