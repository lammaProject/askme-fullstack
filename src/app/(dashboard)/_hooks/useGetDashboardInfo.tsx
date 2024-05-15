import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/dashboard.interface";
import { getUserMe } from "@/app/(dashboard)/_api/users.api";

const useGetDashboardInfo = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setUserData(fetchedData.data.user);
    }
  }, [fetchedData]);

  return { userData, isLoading };
};

export default useGetDashboardInfo;
