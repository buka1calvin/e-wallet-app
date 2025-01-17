import React from "react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Finance Manager | Authenticate",
  description:
    "Manage your finances efficiently and achieve your financial goals!",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-slate-500 w-screen">
      <section className="bg-primary p-10 lg:flex hidden w-1/2 items-center justify-center xl:2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col space-y-12 justify-center">
          <Image
            src="/images/logo.webp"
            alt=""
            width={124}
            height={42}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="text-2xl fot-bold">Take Control of Your Finances</h1>
            <p className="text-sm text-green-100">
              Achieve financial freedom with powerful tools to track expenses,
              budget smarter, and invest wisely. Whether you're managing
              personal finances or growing a business, we've got you covered.
            </p>
          </div>
          <div className="w-full relative h-56">
            <Image
              src="/images/finance.webp"
              alt="image form"
              width={0}
              height={0}
              sizes="100vw"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute flex items-end px-5 text-center text-white top-0 left-0 bg-gradient-to-b from-transparent to-primary h-full w-full">
              <h1>
              Visualize your financial progress, set goals, and make informed
              decisions. Your journey to financial success starts here.
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:p-10 lg:py-0 lg:justify-center ">
        <div className="mb-16 lg:hidden">
          <Image
            src="/icons/logo-full-brand.svg"
            alt=""
            width={244}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </main>
  );
}
