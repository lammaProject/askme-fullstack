import Chat from "@/app/(dashboard)/_components/Chat";

export default async function Page({
  params: { username, usernameSend },
}: {
  params: { username: string; usernameSend: string };
}) {
  // const queryClient = new QueryClient();
  //
  // await queryClient.prefetchQuery({
  //   queryKey: ["chat"],
  //   queryFn: () => getChatUsers(username, usernameSend),
  // });
  // const { data: fetchedData } = useQuery({
  //   queryKey: ["chat"],
  //   queryFn: () =>
  //     axios.get(
  //       `/api/chat?username=${params.username}&usernameSend=${params.usernameSend}`,
  //     ),
  //   refetchOnWindowFocus: false,
  // });

  // const setOpenChat = useDashboard((store: any) => store.setOpenChat);
  //
  // useEffect(() => {
  //   setOpenChat(true);
  // }, []);

  return (
    <div className={"col-span-2"}>
      <Chat username={username} usernameSend={usernameSend} />
    </div>
  );
}
