import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const filters = await req.json();
  const { editorial, format, language, genre, orderBy } = filters;

  let filter = {};
  if (editorial)
    filter.editorial = {
      editorial: editorial,
    };
  if (format)
    filter.bookFormats = {
      some: {
        format: {
          format: format,
        },
      },
    };
  if (language)
    filter.bookLanguages = {
      some: {
        language: {
          language: language,
        },
      },
    };
  if (genre)
    filter.bookGenres = {
      some: {
        genre: {
          genre: genre,
        },
      },
    };

  let order = {};
  if (orderBy && typeof orderBy === "object") {
    if (orderBy.price) order.price = orderBy.price;
    if (orderBy.pages) order.pages = orderBy.pages;
    if (orderBy.name) order.name = orderBy.name;
  }

  try {
    const books = await prisma.book.findMany({
      where: filter,
      orderBy: order,
      include: {
        editorial: true,
        bookLanguages: {
          include: {
            language: true,
          },
        },
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
