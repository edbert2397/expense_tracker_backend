/*
  Warnings:

  - Added the required column `primary` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "primary" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "primary" BOOLEAN NOT NULL;
