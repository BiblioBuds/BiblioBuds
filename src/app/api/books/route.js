import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const newBook = await req.json();

    const { format, language, genre, editorial, date, ...otherData } = newBook;

    const formatRecord = await prisma.format.findUnique({
      where: { format },
    });
    const formatId = formatRecord
      ? formatRecord.id
      : (await prisma.format.create({ data: { format } })).id;

    const languageRecord = await prisma.language.findUnique({
      where: { language },
    });
    const languageId = languageRecord
      ? languageRecord.id
      : (await prisma.language.create({ data: { language } })).id;

    const genreRecord = await prisma.genre.findUnique({
      where: { genre },
    });
    const genreId = genreRecord
      ? genreRecord.id
      : (await prisma.genre.create({ data: { genre } })).id;

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
        formatId,
        languageId,
        genreId,
        editorialId,
        date: formattedDate,
      },
    });

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