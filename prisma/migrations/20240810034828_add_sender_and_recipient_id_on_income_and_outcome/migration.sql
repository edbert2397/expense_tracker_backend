/*
  Warnings:

  - Added the required column `senderId` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "recipientId" INTEGER NOT NULL;
