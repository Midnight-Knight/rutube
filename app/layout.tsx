import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import Aside from "@/components/aside";
import Header from "@/components/header";

const inter = Open_Sans({ subsets: ["cyrillic", 'latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <Aside/>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
