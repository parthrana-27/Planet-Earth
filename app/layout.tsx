import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import "../styles/main.css";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Rana - Portfolio",
  description: "3D Interactive Portfolio",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito_sans.variable} antialiased scroll-smooth`}>
      <body suppressHydrationWarning>
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
