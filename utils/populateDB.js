const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const dataPath = path.join(__dirname, "./books.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

async function main() {
  for (const book of data) {
    book.date = new Date(book.date).toISOString();

    const formatIds = [];
    for (const format of book.formats) {
      const formatRecord = await prisma.format.findUnique({
        where: { format },
      });
      const formatId = formatRecord
        ? formatRecord.id
        : (await prisma.format.create({ data: { format } })).id;
      formatIds.push(formatId);
    }
    delete book.formats;

    const languageIds = [];
    for (const language of book.languages) {
      const languageRecord = await prisma.language.findUnique({
        where: { language },
      });
      const languageId = languageRecord
        ? languageRecord.id
        : (await prisma.language.create({ data: { language } })).id;
      languageIds.push(languageId);
    }
    delete book.languages;

    const genreIds = [];
    for (const genre of book.genres) {
      const genreRecord = await prisma.genre.findUnique({
        where: { genre },
      });
      const genreId = genreRecord
        ? genreRecord.id
        : (await prisma.genre.create({ data: { genre } })).id;
      genreIds.push(genreId);
    }
    delete book.genres;

    const editorialRecord = await prisma.editorial.findUnique({
      where: { editorial: book.editorial },
    });
    book.editorialId = editorialRecord
      ? editorialRecord.id
      : (await prisma.editorial.create({ data: { editorial: book.editorial } }))
          .id;

    delete book.editorial;

    const createdBook = await prisma.book.create({
      data: book,
    });

    for (const formatId of formatIds) {
      await prisma.bookFormat.create({
        data: {
          formatId,
          bookId: createdBook.id,
        },
      });
    }

    for (const genreId of genreIds) {
      await prisma.bookGenre.create({
        data: {
          genreId,
          bookId: createdBook.id,
        },
      });
    }

    for (const languageId of languageIds) {
      await prisma.bookLanguage.create({
        data: {
          languageId,
          bookId: createdBook.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Your database is now populated!.");
    await prisma.$disconnect();
  });
