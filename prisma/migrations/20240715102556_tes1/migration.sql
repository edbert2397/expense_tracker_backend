-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFriends" (
    "friendsId" INTEGER NOT NULL,
    "friendsOfId" INTEGER NOT NULL,

    CONSTRAINT "UserFriends_pkey" PRIMARY KEY ("friendsId","friendsOfId")
);

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_friendsId_fkey" FOREIGN KEY ("friendsId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_friendsOfId_fkey" FOREIGN KEY ("friendsOfId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
