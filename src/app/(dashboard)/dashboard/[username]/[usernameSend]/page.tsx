"use client";
import Chat from "@/app/(dashboard)/_components/Chat";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useDashboard } from "../../../../../../store/store";

export default function Page({
  params,
}: {
  params: { username: string; usernameSend: string };
}) {
  const { data: fetchedData, refetch } = useQuery({
    queryKey: ["chat"],
    queryFn: () =>
      axios.get(
        `/api/chat?username=${params.username}&usernameSend=${params.usernameSend}`,
      ),
    refetchOnWindowFocus: false,
  });

  const setOpenChat = useDashboard((store: any) => store.setOpenChat);

  useEffect(() => {
    setOpenChat(true);
  }, []);

  return (
    <div className={"col-span-2"}>
      <Chat data={fetchedData} />
    </div>
  );
}
