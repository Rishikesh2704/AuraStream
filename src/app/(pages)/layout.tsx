'use client'
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MobileNavbar from "../Mobile/MobileNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setisMobile] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width:600px)");
      setisMobile(() => (mediaQuery?.matches ? true : false));
      
    }, []);
  
  return (
    <>
      <MobileNavbar /> 
      <Navbar />

      {children}
    </>
  );
}
