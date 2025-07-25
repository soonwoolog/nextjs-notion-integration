import NotionHeading from "../blocks/NotionHeading";
import type { NotionBlockResponse } from "notion-config";

export function NotionPage({ blocks }: { blocks: NotionBlockResponse }) {
  return (
    <>
      <div>{blocks.title}</div>
      {blocks.content.map((row, idx) => {
        return (
          <div key={idx}>
            {(() => {
              switch (row.type) {
                case "heading_1":
                  return <NotionHeading data={row.content} />;
                case "bulleted_list_item":
                  return <div>{row.content}</div>;
                // ...
              }
            })()}
          </div>
        );
      })}
    </>
  );
}

export default NotionPage;
