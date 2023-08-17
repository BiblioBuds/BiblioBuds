/*
  Warnings:

  - You are about to drop the column `formatId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "formatId",
DROP COLUMN "genreId";
