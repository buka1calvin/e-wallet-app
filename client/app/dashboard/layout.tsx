import SideNav from "@/components/navBars/SideNav";
import TopNav from "@/components/navBars/TopNav";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex lg:flex-row flex-col w-screen h-screen bg-orange-300">
      <div className="w-full max-w-[240px] min-h-screen bg-primary text-white lg:block hidden">
        <SideNav />
      </div>
      <section className="bg-neutral-50 w-full h-full flex flex-col">
        <div className="w-full bg-white lg:h-20 h-14 border">
        <TopNav/>
        </div>

        <div className="flex-grow w-full h-full p-6 overflow-y-scroll mb-3">{children}</div>
      </section>
      <div className="lg:hidden block w-full h-14 shadow bg-primary text-white">
        bottom Nav
      </div>
    </div>
  );
};

export default DashboardLayout;
