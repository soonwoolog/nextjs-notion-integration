import NotionPage from "@/components/notion/NotionPage";
import { getNotionPageBySlug } from "@/lib/notion/notion-api";

export default async function NotionPostPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const data = await getNotionPageBySlug(slug);
  return <NotionPage data={data} />;
}
