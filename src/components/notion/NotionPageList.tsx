import { NotionPageResponse } from "@/lib/notion/notion-config";
import Link from "next/link";

export default function NotionPageList({ data }: { data: NotionPageResponse[] }) {
  return (
    <>
      <div>All Posts</div>
      <ul>
        {data.map(row => {
          return (
            <li key={row.id}>
              <Link href={`/post/${row.slug}`}>
                <div>{row.category}</div>
                <div>{row.title}</div>
                <div>{row.date}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
