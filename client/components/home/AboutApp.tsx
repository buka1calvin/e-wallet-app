"use client"
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { people } from "@/constants/people";
import { features } from "@/constants/features";
import FeatureCard from "../ui/FeatureCard";
import Link from "next/link";
import { useUsers } from "@/contexts/AuthProvider";

const AboutApp = () => {
  const {user}=useUsers()
  return (
    <section className="flex w-screen min-h-screen pb-20 md:px-0 px-4 text-center flex-col justify-center items-center bg-primary text-white md:pt-[30rem] pt-[16rem]">
      <h1 className="md:text-5xl text-2xl font-medium mb-4">
        Unprecedented Control <br /> Over Your Personal Finances
      </h1>
      <p className="text-text max-w-6xl mb-14">
        Take charge of your financial journey with the Personal Financial
        Manager. Track income, manage expenses, and set budgets effortlessly—all
        in one unified platform. Gain unparalleled visibility and control over
        your finances while saving time and maximizing your savings for a secure
        future.
      </p>
      <div className="flex md:flex-row flex-col justify-between md:px-20 px-4 gap-6 w-full">
        <div className="flex flex-col md:items-start items-center w-full justify-between">
          <h1 className="text-2xl font-semibold mb-10">Who Uses Our App?</h1>
          <div className="flex flex-row items-start justify-start mb-4 w-full">
            <AnimatedTooltip items={people} />
          </div>
          <p className="mb-6 text-text text-sm md:text-start text-center">
            Our app caters to a diverse range of users, including individuals
            managing their personal finances, small business owners tracking
            their expenditures, and freelancers organizing irregular income
            streams. With an intuitive interface and customizable features,
            users of all financial literacy levels can achieve their financial
            goals, whether it's debt management, savings growth, or budget
            optimization.
          </p>
          <Link
            href={`${user ? "/dashboard" : "/sign-up"}`}
            className="bg-white text-primary font-semibold hover:bg-neutral-900 hover:text-white py-2 px-4 rounded-full"
          >
            Get Started
          </Link>
        </div>
        <div className="flex flex-col items-start w-full">
          <h1 className="text-2xl font-semibold mb-12">
            What Our App Can Do for You
          </h1>
          <div className="grid md:grid-cols-3 gap-3">
            {features.map((feature, i) => (
              <FeatureCard
                title={feature.title}
                description={feature.description}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApp;
