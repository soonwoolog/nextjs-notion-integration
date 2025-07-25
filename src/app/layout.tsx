import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "nextjs-notion-integration"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
