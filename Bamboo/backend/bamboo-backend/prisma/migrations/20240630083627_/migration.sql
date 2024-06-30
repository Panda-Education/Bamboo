/*
  Warnings:

  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "Description_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT DEFAULT '';

-- DropTable
DROP TABLE "Description";

-- CreateTable
CREATE TABLE "Details" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "subjectDetails" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
