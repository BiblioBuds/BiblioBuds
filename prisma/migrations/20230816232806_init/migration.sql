/*
  Warnings:

  - A unique constraint covering the columns `[editorial]` on the table `Editorial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[format]` on the table `Format` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[genre]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_editorialId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_languageId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "editorialId" DROP NOT NULL,
ALTER COLUMN "genreId" DROP NOT NULL,
ALTER COLUMN "languageId" DROP NOT NULL,
ALTER COLUMN "ratingId" DROP NOT NULL,
ALTER COLUMN "formatId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Editorial_editorial_key" ON "Editorial"("editorial");

-- CreateIndex
CREATE UNIQUE INDEX "Format_format_key" ON "Format"("format");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_key" ON "Genre"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "Language_language_key" ON "Language"("language");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_editorialId_fkey" FOREIGN KEY ("editorialId") REFERENCES "Editorial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
