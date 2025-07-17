import NotionPageList from "@/components/notion/NotionPageList";
import { getNotionPageList } from "@/lib/notion/notion-api";

export default async function Home() {
  const data = await getNotionPageList();
  return <NotionPageList data={data} />;
}
