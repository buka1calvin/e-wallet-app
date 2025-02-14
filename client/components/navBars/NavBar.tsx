"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navLinks } from "@/constants/navLinks";
import { CgMenuRightAlt } from "react-icons/cg";
import Image from "next/image";
import OverlayModel from "../ui/OverlayModel";
import XsNavbar from "./XsNavbar";
import getUserInfo from "@/lib/getUserInfo";
import { useUsers } from "@/contexts/AuthProvider";

const NavBar = () => {
  const pathname = usePathname();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = getUserInfo();
  const{logout}=useUsers()

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrolled]);

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.title === "Dashboard" && !user) {
      return false;
    }
    return true;
  });
  return (
    <nav
      className={cn(
        "max-h-20 fixed top-0 inset-x-0 max-w-full mx-auto z-[1000] "
      )}
    >
      <motion.div
        className={cn(
          `flex md:px-20 py-3 max-w-full mx-auto px-5 justify-between items-center border-b border-text`,
          isScrolled
            ? "bg-primary shadow shadow-primary/40 border-none"
            : "bg-white"
        )}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Link href="/">
          <Image
            src={
              isScrolled ? "/icons/logo-white.svg" : "/icons/logo-orange.svg"
            }
            alt="logo"
            width={300}
            height={80}
            className="h-14 w-40"
          />
        </Link>
        <div className="text-text_color w-[47%] font-light md:flex justify-center items-center hidden relative">
          {filteredNavLinks.map((item, i) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={i}
                href={item.path}
                className={cn(
                  "text-sm flex items-center justify-center w-20 h-7 relative"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-secondary/20 shadow-inner shadow-white/20"
                    layoutId="activeLink"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 font-normal",
                    isActive
                      ? "font-semibold text-secondary"
                      : "text-neutral-700",
                    isScrolled && "text-text"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="w-fit md:flex hidden items-center md:gap-4">
          {user ? (
            <button
              onClick={logout}
              className={cn(
                isScrolled
                  ? "border-text text-text"
                  : "border-secondary text-secondary",
                "py-2 shadow-lg text-sm px-6 border"
              )}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/sign-up"
              className={cn(
                isScrolled
                  ? "border-text text-text"
                  : "border-secondary text-secondary",
                "py-2 shadow-lg text-sm  px-6 border "
              )}
            >
              {user ? "Get Started" : "Sign out"}
            </Link>
          )}

          <Link
            href="/schedule"
            className="py-2 shadow-lg text-sm text-white bg-secondary px-6 border border-secondary rounded-full"
          >
            Book A Demo
          </Link>
        </div>
        <button
          onClick={() => setIsModelOpen(true)}
          className="md:hidden flex justify-center items-center p-1 rounded border border-tertiary text-secondary"
        >
          <CgMenuRightAlt className="h-9 w-9" />
        </button>
      </motion.div>
      <OverlayModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <XsNavbar onClose={() => setIsModelOpen(false)} />
        </motion.div>
      </OverlayModel>
    </nav>
  );
};

export default NavBar;
