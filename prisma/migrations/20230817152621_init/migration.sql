/*
  Warnings:

  - You are about to drop the column `languageId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_languageId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "languageId";

-- CreateTable
CREATE TABLE "BookLanguage" (
    "bookId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "BookLanguage_pkey" PRIMARY KEY ("bookId","languageId")
);

-- AddForeignKey
ALTER TABLE "BookLanguage" ADD CONSTRAINT "BookLanguage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookLanguage" ADD CONSTRAINT "BookLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
