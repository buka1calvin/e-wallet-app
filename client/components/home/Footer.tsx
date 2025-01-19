import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-text flex md:flex-row flex-col items-center justify-between md:px-20 px-4 h-20">
      <Image
        src="/icons/logo-white.svg"
        alt="logo"
        width={300}
        height={80}
        className="h-14 w-40"
      />
      <p className="font-semibold">© 2024 E-Wallet. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
