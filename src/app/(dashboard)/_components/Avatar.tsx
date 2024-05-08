"use client";

import { useRouter } from "next/navigation";
import useGetDashboardInfo from "@/app/(dashboard)/_hooks/useGetDashboardInfo";

export default function Avatar() {
  const { name, isLoading } = useGetDashboardInfo();

  const navigate = useRouter();

  return isLoading ? (
    <span className="loading loading-ring loading-md"></span>
  ) : (
    <div
      onClick={() => navigate.push("/dashboard")}
      className={
        "flex items-center bg-accent rounded-[15px] p-2 cursor-pointer hover:bg-primary transition-all"
      }
    >
      <div className="avatar online mr-2">
        <div className="bg-neutral text-neutral-content rounded-full w-14 p-4"></div>
      </div>
      <span className="text-xs card-title">{name}</span>
    </div>
  );
}
