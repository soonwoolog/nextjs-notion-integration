import { getNotionPageBySlug } from "notion-api";
import { NotionPage } from "components/page/NotionPage";

export default async function Home() {
  const data = await getNotionPageBySlug(["editing/fcp-shortcuts-editing-tips"]);
  return <NotionPage blocks={data} />;
}
