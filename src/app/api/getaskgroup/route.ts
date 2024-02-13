import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const data = await prisma.ask.findMany({
    where: {
      name,
    },
  });

  if (!data) Response.json({ error: "Нет данных" });
  return Response.json({ data });
}
