
import Footer from "@/components/home/Footer";
import NavBar from "@/components/navBars/NavBar";
import React from "react";
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="">
    <NavBar/>
    {children}
    <Footer/>
    </main>;
}
