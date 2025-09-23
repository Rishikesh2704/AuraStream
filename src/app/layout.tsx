import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
 import "./globals.css";
import "./index.css";
import "./responsive.css"
import './Authentication/auth.css'
import ReduxProvider from "./ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight:"700",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraStream",
  description: "Website for streaming latest anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={` ${geistMono.variable}  antialiased`}
      >
        <ReduxProvider >
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
