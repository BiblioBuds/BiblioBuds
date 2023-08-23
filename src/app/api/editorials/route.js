import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const editorials = await prisma.editorial.findMany();
    return NextResponse.json(editorials);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
