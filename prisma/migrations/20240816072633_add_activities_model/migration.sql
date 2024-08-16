/*
  Warnings:

  - You are about to drop the column `primary` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `primary` on the `Outcome` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Income" DROP COLUMN "primary";

-- AlterTable
ALTER TABLE "Outcome" DROP COLUMN "primary";

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "secondUserId" INTEGER NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
