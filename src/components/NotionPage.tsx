import NotionHeading from "./NotionHeading";

export function NotionPage({ data }: { data: any[] }) {
  return (
    <>
      {data.map((row, idx) => {
        return (
          <div key={idx}>
            {(() => {
              switch (row.type) {
                case "heading_1":
                  return <NotionHeading data={row.content} />;
                case "bulleted_list_item":
                  return <div>{row.content}</div>;
                default:
                  return <div></div>;
              }
            })()}
          </div>
        );
      })}
    </>
  );
}

export default NotionPage;
