'use client'
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import MobileNavbar from "../Mobile/MobileNavbar";
import { useAppSelector } from "@/Redux/hooks";
import ExploreModal from "../Components/ExploreModal/Explore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setisMobile] = useState(false);
  const { exploreModalState } = useAppSelector((st) => st.states)
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width:600px)");
      setisMobile(() => (mediaQuery?.matches ? true : false));
      
    }, []);
  
  return (
    <>
      {isMobile?<MobileNavbar /> :
      <Navbar />}
      {exploreModalState && <ExploreModal/>}
      {children}
    </>
  );
}
