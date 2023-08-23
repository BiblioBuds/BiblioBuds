import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const formats = await prisma.format.findMany();
    return NextResponse.json(formats);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
