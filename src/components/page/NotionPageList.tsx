import Link from "next/link";
import type { NotionPageResponse } from "notion-config";

export function NotionPageList({ posts }: { posts: NotionPageResponse[] }) {
  return (
    <>
      <h2>All Posts</h2>
      <div>
        {posts.map(post => {
          return (
            <article key={post.id}>
              <Link href={`/post/${post.slug}`}>
                <div>{post.category}</div>
                <h3>{post.title}</h3>
                <div>{post.date}</div>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default NotionPageList;
