import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json({ error });
  }
};

