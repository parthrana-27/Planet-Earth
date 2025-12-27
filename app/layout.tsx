import type { Metadata } from "next";

import localFont from "next/font/local";

import "../styles/main.css";

const inter = localFont({
  src: [
    {

      path: "../public/fonts/Inter/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/InterVariable.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--inter",
  display: "swap",
});

const appleGaramond = localFont({
  src: [
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--apple-garamond",
});

export const metadata: Metadata = {
  title: "Parth Rana | 3D Portfolio",
  description: "Explore the beauty of our planet with our 3D planet visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${appleGaramond.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
