/*
  Warnings:

  - You are about to drop the column `AdminId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_AdminId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "AdminId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
