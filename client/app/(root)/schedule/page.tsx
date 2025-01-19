"use client"
import React from "react";
import { InlineWidget } from "react-calendly";

const SchedulePage = () => {
  return (
    <main className="w-full overflow-hidden h-screen">
      <InlineWidget url="https://calendly.com/calvinbukarani" />
    </main>
  );
};

export default SchedulePage;
