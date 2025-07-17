import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "nextjs-notion-intergration" };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}
