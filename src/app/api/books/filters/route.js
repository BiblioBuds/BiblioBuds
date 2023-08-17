import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  // WIP
  try {
    const books = await prisma.book.findMany({
      include: {
        editorial: true,
        language: true,
        bookGenres: {
          include: {
            genre: true,
          },
        },
        bookFormats: {
          include: {
            format: true,
          },
        },
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
