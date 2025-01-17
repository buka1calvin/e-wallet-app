import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/Store";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export const metadata: Metadata = {
  title: "Finance Flow - Personal Financial Manager",
  description:
    "Finance Flow is your ultimate personal finance management app. Track your income and expenses, manage accounts, set budgets, and review insightful reports—all in one user-friendly dashboard. Simplify your financial journey today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased flex flex-col justfiy-center items-center w-screen overflow-x-hidden`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
