"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../../../../pusher/pusher";
import axios from "axios";
import { status, statusColor } from "@/app/(ask)/ask/group/constants";

export function GroupCard({ name, id }: { name: string; id: string }) {
  const [data, setData] = useState<Ask[]>([]);

  async function getData() {
    const { data: fetchedData } = await axios.post<{ data: Ask[] }>(
      "/api/getaskgroup",
      {
        name,
      },
    );

    if (fetchedData) {
      setData(fetchedData.data);
    }
  }

  useEffect(() => {
    pusherClient.subscribe(`answer_${id}`);

    pusherClient.bind("answer", () => {
      void getData();
    });

    return () => {
      pusherClient.unsubscribe(`answer_${id}`);
      pusherClient.unbind("answer");
    };
  }, []);

  useEffect(() => {
    void getData();
  }, []);

  return (
    <>
      {data.length}
      {!data?.length ? (
        <div>Загрузка страницы</div>
      ) : (
        data.map((i, index) => (
          <div key={index} className={"bg-gray-600"}>
            {index + 1}
            <h1>{i.text}</h1>
            <p className={`text-[${statusColor[i.status]}] `}>
              {status[i.status]}
            </p>
            {i?.answer && <p className={"text-black"}>{i.answer}</p>}
          </div>
        ))
      )}
    </>
  );
}
