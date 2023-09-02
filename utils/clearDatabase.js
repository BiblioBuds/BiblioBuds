const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.detail.deleteMany();
  await prisma.bookFormat.deleteMany();
  await prisma.bookGenre.deleteMany();
  await prisma.bookLanguage.deleteMany();
  await prisma.book.deleteMany();
  await prisma.format.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.language.deleteMany();
  await prisma.editorial.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  // await prisma.orderBook.deleteMany();
}

clearDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Your database is now cleared.");
    await prisma.$disconnect();
  });
