"use client";

import { useRouter } from "next/navigation";
import useGetDashboardInfo from "@/app/(dashboard)/_hooks/useGetDashboardInfo";
import { useState } from "react";

export default function Avatar() {
  const [errorImage, setErrorImage] = useState(true);

  const { userData, isLoading } = useGetDashboardInfo();

  const navigate = useRouter();

  return isLoading ? (
    <span className="loading loading-ring loading-md"></span>
  ) : (
    <div
      onClick={() => navigate.push("/dashboard")}
      className={
        "flex items-center rounded-[15px] p-2 cursor-pointer hover:bg-primary hover:text-white transition-all"
      }
    >
      <div className="avatar online mr-2">
        <div className="w-16 rounded-full bg-accent">
          {userData?.photo && errorImage && (
            <img
              onError={() => setErrorImage(false)}
              src={userData.photo}
              alt={"avatar"}
            />
          )}
        </div>
      </div>
      <span>{userData?.name}</span>
    </div>
  );
}
