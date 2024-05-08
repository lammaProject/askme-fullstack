import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useGetDashboardInfo = () => {
  const [name, setName] = useState("");

  const { data: meData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/users/me"),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (meData && meData.data.status === "success") {
      setName(meData.data.data.user.name);
      if (!name)
        void axios.post("/api/leftside", {
          name: meData.data.data.user.name,
          idUser: meData.data.data.user.id,
        });
    }
  }, [meData]);

  return { name, isLoading };
};

export default useGetDashboardInfo;
