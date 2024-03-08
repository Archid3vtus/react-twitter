/*
  Warnings:

  - A unique constraint covering the columns `[followedId,followerId]` on the table `FollowerRelationship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FollowerRelationship_followedId_followerId_key" ON "FollowerRelationship"("followedId", "followerId");
