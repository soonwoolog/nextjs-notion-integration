require("dotenv").config();
import { Client, isFullPage } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface NotionResult {
  id: string;
  title: string;
}

export async function getPosts(): Promise<NotionResult[]> {
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Last edited time",
        direction: "ascending"
      }
    ]
  });

  const results: NotionResult[] = response.results.filter(isFullPage).map(res => ({
    id: "1",
    title: Object.values(res.properties).find(p => p.type === "title")?.title[0].plain_text ?? ""
  }));

  return results;
}
