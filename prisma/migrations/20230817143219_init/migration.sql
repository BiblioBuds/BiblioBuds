/*
  Warnings:

  - You are about to drop the column `clientId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_BookToFormat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToFormat" DROP CONSTRAINT "_BookToFormat_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToFormat" DROP CONSTRAINT "_BookToFormat_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "clientId";

-- DropTable
DROP TABLE "_BookToFormat";

-- DropTable
DROP TABLE "_BookToGenre";

-- CreateTable
CREATE TABLE "BookGenre" (
    "genreId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookGenre_pkey" PRIMARY KEY ("genreId","bookId")
);

-- CreateTable
CREATE TABLE "BookFormat" (
    "formatId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookFormat_pkey" PRIMARY KEY ("formatId","bookId")
);

-- AddForeignKey
ALTER TABLE "BookGenre" ADD CONSTRAINT "BookGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGenre" ADD CONSTRAINT "BookGenre_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookFormat" ADD CONSTRAINT "BookFormat_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "Format"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookFormat" ADD CONSTRAINT "BookFormat_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
