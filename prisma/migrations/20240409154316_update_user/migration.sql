/*
  Warnings:

  - You are about to drop the column `mobiile` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobile]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_mobiile_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mobiile",
ADD COLUMN     "mobile" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
