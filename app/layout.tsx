import "@/app/ui/globals.css";
import type { Metadata } from "next";
import { notoSansKR } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "제비 대시보드",
  description: "제비 앱의 제휴를 관리합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKR.className} antialiased`}>{children}</body>
    </html>
  );
}