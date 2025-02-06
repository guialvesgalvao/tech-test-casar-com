import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getIsMobile } from "@/hooks/useIsMobileSSR";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Test Casar.com",
  description: "Teste Técnico para vaga de Desenvolvedor Frontend Pleno",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isMobile = await getIsMobile();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}>
        <QueryProvider>
          {!isMobile && <Header />}
          <main className={`flex-1 overflow-auto ${isMobile && "mt-6"}`}>{children}</main>
          {isMobile && <Footer />}
        </QueryProvider>
      </body>
    </html>
  );
}
