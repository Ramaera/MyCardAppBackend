/*
  Warnings:

  - Added the required column `cardUserId` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documents" ADD COLUMN     "cardUserId" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "utrNo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "myCard" ALTER COLUMN "cardNumber" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_cardUserId_fkey" FOREIGN KEY ("cardUserId") REFERENCES "CardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
