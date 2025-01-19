"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import getUserInfo from "../getUserInfo";

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const user = getUserInfo();
    if (!user) {
      router.push("/sign-in");
    }
  }, [router]);
  return <>{children}</>;
};

export default ClientWrapper;
