/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CARD_TYPE" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'DIAMOND');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('NOT_INITILAIZED', 'PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "CardUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "mobileNumber" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "verificationTokenExpiry" TIMESTAMP(3),
    "Role" "Role" DEFAULT 'USER',
    "address" JSONB,
    "metaData" JSONB,
    "referralAgencyCode" TEXT,

    CONSTRAINT "CardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "status" "STATUS" DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "utrNo" TEXT NOT NULL,
    "documentApprovalDate" TIMESTAMP(3),
    "myCardId" INTEGER NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "myCard" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardNumber" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "cardActivationDate" TIMESTAMP(3),
    "cardType" "CARD_TYPE",
    "cardValue" INTEGER,
    "maxDiscount" INTEGER NOT NULL,
    "cardValidity" INTEGER NOT NULL,
    "cardHolderUserId" TEXT NOT NULL,

    CONSTRAINT "myCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER NOT NULL,
    "metaData" JSONB,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponCode" (
    "_id" SERIAL NOT NULL,
    "couponCode" TEXT NOT NULL,
    "isRedemmed" BOOLEAN NOT NULL DEFAULT false,
    "discount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" INTEGER,
    "cardHolderUserId" TEXT,
    "myCardId" INTEGER NOT NULL,

    CONSTRAINT "CouponCode_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardUser_mobileNumber_key" ON "CardUser"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CardUser_email_key" ON "CardUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "myCard_cardNumber_key" ON "myCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CouponCode_couponCode_key" ON "CouponCode"("couponCode");

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_myCardId_fkey" FOREIGN KEY ("myCardId") REFERENCES "myCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myCard" ADD CONSTRAINT "myCard_cardHolderUserId_fkey" FOREIGN KEY ("cardHolderUserId") REFERENCES "CardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "myCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCode" ADD CONSTRAINT "CouponCode_myCardId_fkey" FOREIGN KEY ("myCardId") REFERENCES "myCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCode" ADD CONSTRAINT "CouponCode_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCode" ADD CONSTRAINT "CouponCode_cardHolderUserId_fkey" FOREIGN KEY ("cardHolderUserId") REFERENCES "CardUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
