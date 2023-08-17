import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const updatedBook = await req.json();

    const { format, language, genre, editorial, date, ...otherData } =
      updatedBook;

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

    const storedBook = await prisma.book.update({
      where: { id: Number(id) },
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


export const GET = async (req, {params}) => {
  const { id } = params;
  console.log(id)
  try {
    console.log(id)
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