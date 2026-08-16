import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/UI/CustomCursor";
import "../styles/main.css";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Rana - Portfolio | AI & Computer Engineering",
  description: "3D Interactive Portfolio of Parth Rana, Computer Engineering Student specializing in AI, Machine Learning, and Interactive Computing.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito_sans.variable} antialiased scroll-smooth`}>
      <body suppressHydrationWarning className="bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">
        <CustomCursor />


        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

