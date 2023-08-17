import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const newBook = await req.json();

    const { formats, languages, genres, editorial, date, ...otherData } =
      newBook;

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

    const storedBook = await prisma.book.create({
      data: {
        ...otherData,
        editorialId,
        date: formattedDate,
      },
    });

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


export const GET = async (req, res) => {
  try {
    const books = await prisma.book.findMany()
    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json({error})
  }
}