"use client";
import { useUsers } from "@/contexts/AuthProvider";
import Link from "next/link";
import React, { FC } from "react";
interface ButtonProps {
  title: string;
  className: string;
}
const ButtonOne: FC<ButtonProps> = ({ title, className }) => {
  const { user } = useUsers();
  return (
    <Link
      href={`${user ? "/dashboard" : "/sign-up"}`}
      className={`${className} relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-range-300`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary via-orange-600 to-primary"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-secondary rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">{title}</span>
    </Link>
  );
};

export default ButtonOne;
