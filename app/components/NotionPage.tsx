"use client";

import { useEffect, useState } from "react";
import { NotionResult } from "@/lib/notion";

export default function NotionPage() {
  const [list, setList] = useState<NotionResult[]>([]);

  useEffect(() => {
    fetch("/api/notion")
      .then(res => res.json())
      .then(setList);
  }, []);

  return (
    <div>
      <h1>My Project</h1>

      <ol>
        {list.map((row, idx) => {
          return (
            <li key={idx}>
              <a href={row.id}>{row.title}</a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
