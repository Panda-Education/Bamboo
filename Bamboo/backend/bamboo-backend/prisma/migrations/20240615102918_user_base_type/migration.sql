/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "AccountRegGoogleRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountRegGoogleRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "initialised" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "StudentGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "AdminId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "announcementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Description" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "subjectDetails" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "videoContent" TEXT,
    "documentFile" TEXT NOT NULL,
    "richText" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "assignmentId" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentToStudentGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentToSubmission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TutorCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssignmentToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssignmentToStudentGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_email_key" ON "Tutor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToStudentGroup_AB_unique" ON "_StudentToStudentGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToStudentGroup_B_index" ON "_StudentToStudentGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubmission_AB_unique" ON "_StudentToSubmission"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubmission_B_index" ON "_StudentToSubmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorCourses_AB_unique" ON "_TutorCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorCourses_B_index" ON "_TutorCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToStudent_AB_unique" ON "_CourseToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToStudent_B_index" ON "_CourseToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToStudent_AB_unique" ON "_AssignmentToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToStudent_B_index" ON "_AssignmentToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToStudentGroup_AB_unique" ON "_AssignmentToStudentGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToStudentGroup_B_index" ON "_AssignmentToStudentGroup"("B");

-- AddForeignKey
ALTER TABLE "StudentGroup" ADD CONSTRAINT "StudentGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGroup" ADD CONSTRAINT "StudentGroup_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToStudentGroup" ADD CONSTRAINT "_StudentToStudentGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToStudentGroup" ADD CONSTRAINT "_StudentToStudentGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubmission" ADD CONSTRAINT "_StudentToSubmission_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubmission" ADD CONSTRAINT "_StudentToSubmission_B_fkey" FOREIGN KEY ("B") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorCourses" ADD CONSTRAINT "_TutorCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorCourses" ADD CONSTRAINT "_TutorCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD CONSTRAINT "_CourseToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD CONSTRAINT "_CourseToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToStudent" ADD CONSTRAINT "_AssignmentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToStudent" ADD CONSTRAINT "_AssignmentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToStudentGroup" ADD CONSTRAINT "_AssignmentToStudentGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToStudentGroup" ADD CONSTRAINT "_AssignmentToStudentGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
