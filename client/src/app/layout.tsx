import { socket } from "@/lib/socket";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import Head from "./head";

// import { useCookies } from 'react-cookie'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telegram web",
  description: "Telegram web application clone created by Sammi.ac",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [cookie] = useCookies(['user']);

  // useEffect(() => {
  //   if (cookie.user) {
  //     socket.emit('identify', cookie.user);
  //   }
  // }, [cookie.user]);

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
