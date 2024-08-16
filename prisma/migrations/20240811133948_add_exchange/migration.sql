-- AlterTable
ALTER TABLE "UserFriends" ADD COLUMN     "exchange" INTEGER NOT NULL DEFAULT 0;

UPDATE "UserFriends" SET "exchange" = 0 where "exchange" IS NULL;
