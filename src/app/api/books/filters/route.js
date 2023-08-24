import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, res) => {
  const nextReq = new NextRequest(req);

  const editorial = nextReq.nextUrl.searchParams.get("filterEditorial") || "";
  const format = nextReq.nextUrl.searchParams.get("filterFormat") || "";
  const language = nextReq.nextUrl.searchParams.get("filterLanguage") || "";
  const genre = nextReq.nextUrl.searchParams.get("filterGenre") || "";
  const orderBy = nextReq.nextUrl.searchParams.get("orderBooks") || "";
  const page = parseInt(nextReq.nextUrl.searchParams.get("page")) || 1;
  const size = parseInt(nextReq.nextUrl.searchParams.get("size")) || 12;

  // const filters = await req.json();
  // const { editorial, format, language, genre, orderBy } = filters;

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

  console.log(filter);

  let order = {};
  if (orderBy && typeof orderBy === "object") {
    if (orderBy.price) order.price = orderBy.price;
    if (orderBy.pages) order.pages = orderBy.pages;
    if (orderBy.title) order.title = orderBy.title;
  }
  console.log(order);

  try {
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        skip: (page - 1) * size,
        take: size,
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
      }),
      prisma.book.count(),
    ]);
    return NextResponse.json({ books, length: total });
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
