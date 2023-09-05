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

  const searchQuery = nextReq.nextUrl.searchParams.get("searchInput") || "";

  let filter = {
    isActive: true,
    stock: {
      gt: 0,
    },
  };

  if (searchQuery) {
    filter.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { author: { contains: searchQuery, mode: "insensitive" } },
    ];
  }
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
  if (orderBy) {
    if (orderBy === "price") order.price = "desc";
    if (orderBy === "pages") order.pages = "desc";
    if (orderBy === "title") order.title = "asc";
  }

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
      prisma.book.count({ where: filter }),
    ]);
    return NextResponse.json({ books, length: total });
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
