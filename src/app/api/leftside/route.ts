import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, idUser } = await req.json();
  if (!name) return Response.json({ status: "nnotName" });

  try {
    await prisma.leftside.create({
      data: {
        idUser: idUser,
        username: name,
      },
    });
  } catch (e) {
    return Response.json({ status: "not" });
  }

  return Response.json({ status: "ok" });
}

export async function GET() {
  const res = await prisma.leftside.findMany();
  if (!res) return Response.json({ stauts: "off" });
  return Response.json({ res });
}
