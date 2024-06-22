/*
  Warnings:

  - You are about to drop the column `firstName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Tutor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Tutor_email_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password";

-- CreateIndex
CREATE INDEX "Student_email_idx" ON "Student"("email");

-- CreateIndex
CREATE INDEX "Tutor_email_idx" ON "Tutor"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
