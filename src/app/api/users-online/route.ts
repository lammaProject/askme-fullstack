import prisma from "../../../../lib/prisma";

export async function GET() {
  const data = await prisma.user.findMany({
    where: {
      status: "online",
    },
  });

  if (!data) Response.json({ error: "Нет данных" });
  return Response.json({ data });
}
