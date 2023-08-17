import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const updatedBook = await req.json();

    const { formats, languages, genres, editorial, date, ...otherData } =
      updatedBook;

    const formatIds = [];
    for (const format of formats) {
      const formatRecord = await prisma.format.findUnique({
        where: { format },
      });
      const formatId = formatRecord
        ? formatRecord.id
        : (await prisma.format.create({ data: { format } })).id;
      formatIds.push(formatId);
    }

    const languageIds = [];
    for (const language of languages) {
      const languageRecord = await prisma.language.findUnique({
        where: { language },
      });
      const languageId = languageRecord
        ? languageRecord.id
        : (await prisma.language.create({ data: { language } })).id;
      languageIds.push(languageId);
    }

    const genreIds = [];
    for (const genre of genres) {
      const genreRecord = await prisma.genre.findUnique({
        where: { genre },
      });
      const genreId = genreRecord
        ? genreRecord.id
        : (await prisma.genre.create({ data: { genre } })).id;
      genreIds.push(genreId);
    }

    const editorialRecord = await prisma.editorial.findUnique({
      where: { editorial },
    });
    const editorialId = editorialRecord
      ? editorialRecord.id
      : (await prisma.editorial.create({ data: { editorial } })).id;

    const formattedDate = new Date(date);

    const storedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        ...otherData,
        editorialId,
        date: formattedDate,
      },
    });

    const bookGenres = await prisma.bookGenre.findMany({
      where: {
        bookId: storedBook.id,
      },
    });

    for (const bookGenre of bookGenres) {
      await prisma.bookGenre.delete({
        where: {
          genreId_bookId: {
            genreId: bookGenre.genreId,
            bookId: bookGenre.bookId,
          },
        },
      });
    }

    const bookFormats = await prisma.bookFormat.findMany({
      where: {
        bookId: storedBook.id,
      },
    });

    for (const bookFormat of bookFormats) {
      await prisma.bookFormat.delete({
        where: {
          formatId_bookId: {
            formatId: bookFormat.formatId,
            bookId: bookFormat.bookId,
          },
        },
      });
    }

    const bookLanguages = await prisma.bookLanguage.findMany({
      where: {
        bookId: storedBook.id,
      },
    });

    for (const bookLanguage of bookLanguages) {
      await prisma.bookLanguage.delete({
        where: {
          bookId_languageId: {
            languageId: bookLanguage.languageId,
            bookId: bookLanguage.bookId,
          },
        },
      });
    }

    for (const formatId of formatIds) {
      await prisma.bookFormat.create({
        data: {
          formatId,
          bookId: storedBook.id,
        },
      });
    }

    for (const genreId of genreIds) {
      await prisma.bookGenre.create({
        data: {
          genreId,
          bookId: storedBook.id,
        },
      });
    }

    for (const languageId of languageIds) {
      await prisma.bookLanguage.create({
        data: {
          bookId: storedBook.id,
          languageId,
        },
      });
    }

    return NextResponse.json({ storedBook });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const GET = async (req, {params}) => {
  const { id } = params;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
        include: {
          orders:true,
          bookGenres: {
            select:{
              genre:true
            }
          },
          bookFormats:{
            select: {
              format:true
            }
          },
          bookLanguages:{
            select: {
              language: true
            }
          }
        },
      },
    )
    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({error})
  }
}
