import { navLinks } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface XsNavbarProps {
  onClose: () => void;
}

const XsNavbar = ({onClose}:XsNavbarProps) => {
   const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("");
  
    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.6,
        };
  
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        }, options);
  
        sections.forEach((section) => {
          observer.observe(section);
        });
  
        return () => {
          sections.forEach((section) => {
            observer.unobserve(section);
          });
        };
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    useEffect(() => {
      setActiveSection(pathname);
    }, [pathname]);

  const variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col w-[70vw] bg-background text-white space-y-4 p-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      {navLinks.map((item, i) => {
        const isActive = activeSection === item.path;
        return (
          <Link
            key={i}
            href={item.path}
            onClick={onClose}
            className={cn(
              "text-lg font-medium py-2 px-4 rounded transition-transform hover:scale-105",
              isActive
                ? "bg-secondary text-black shadow-md shadow-secondary"
                : "bg-neutral-800/50 text-white"
            )}
          >
            {item.title}
          </Link>
        );
      })}
      <div className="w-fit flex-shrink-0">
      </div>
    </motion.div>
  );
};

export default XsNavbar;
