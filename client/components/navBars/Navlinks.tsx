"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { sideNavLinks } from "@/constants/sideNavLinks";
const Navlinks = () => {
  const pathname = usePathname();
  return (
    <div className="mt-8 flex items-center flex-col space-y-2 ">
      {sideNavLinks.map((link, i) => {
        const isActive = pathname === link.path;
        return (
          <Link
            href={link.path}
            key={i}
            className={clsx(
              "flex w-full rounded-lg shadow-inner  shadow-red-800/15 border border-red-800/15 px-2 py-2 text-lg items-center justify-start space-x-2",
              isActive
                ? "text-stone-900 bg-green-50 font-semibold"
                : "text-white bg-transparent font-normal"
            )}
          >
            <link.Icon />
            <span className="text-sm">{link.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
