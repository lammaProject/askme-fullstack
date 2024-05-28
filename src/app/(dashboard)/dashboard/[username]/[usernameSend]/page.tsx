import Chat from "@/app/(dashboard)/_components/Chat";

export default async function Page({
  params: { username, usernameSend },
}: {
  params: { username: string; usernameSend: string };
}) {
  return (
    <div className={"col-span-2"}>
      <Chat username={username} usernameSend={usernameSend} />
    </div>
  );
}
