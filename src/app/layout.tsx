import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const PoppinsSans = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: [ "300", "400", "500", "600"]
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

  return (
    <html lang="en">
      <body className={`${PoppinsSans.variable} antialiased h-screen flex flex-col`}>
        <QueryProvider>
           <Header />
          <main className="flex-1 overflow-auto mt-6">{children}</main>
           <Footer />
          <Toaster position="bottom-right" reverseOrder={true} />
        </QueryProvider>
      </body>
    </html>
  );
}
