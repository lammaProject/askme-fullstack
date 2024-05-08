import Header from "./_components/Header";
import { LeftSide } from "./_components/LeftSide";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      <div className={"grid grid-flow-row-dense grid-cols-3 grid-rows-3"}>
        <LeftSide />
        {children}
      </div>
    </section>
  );
}
