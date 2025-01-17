import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";
import { FiLogIn } from "react-icons/fi";
import { CgMoreVertical } from "react-icons/cg";

const SideNav = () => {
  return (
    <nav className="w-full h-full flex flex-col px-3 py-6 lg:justify-between">
      <h1 className="font-bold text-2xl text-white">LOGO</h1>
      <div className="mb-6 w-full">
        <Navlinks />
      </div>
      <div className="flex flex-col w-full min-h-24 bg-white/10 p-2 gap-5">
        <div className="flex p-2 items-center w-full  gap-2 bg-white text-secondary py-1 rounded">
          <FiLogIn />
          logout
        </div>
        <div className="flex bg-white/20 items-center justify-between">
        <div className="flex gap-2 items-center p-2">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="user image"
            width={32}
            height={32}
            className="h-9 w-9 rounded-full"
          />
          <div className="">
            <h1 className="font-bold">John Doe</h1>
            <p className="text-xs">View Profile</p>
          </div>
          </div>
          <CgMoreVertical/>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
