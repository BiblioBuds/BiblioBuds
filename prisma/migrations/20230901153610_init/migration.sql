/*
  Warnings:

  - You are about to drop the `OrderBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderBook" DROP CONSTRAINT "OrderBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "OrderBook" DROP CONSTRAINT "OrderBook_orderId_fkey";

-- DropTable
DROP TABLE "OrderBook";

-- CreateTable
CREATE TABLE "Detail" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
