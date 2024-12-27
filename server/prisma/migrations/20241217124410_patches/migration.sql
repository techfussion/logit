/*
  Warnings:

  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `industrySupervisorProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `schoolSupervisorProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfileId` on the `User` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `LogEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "IndustrySupervisor" DROP CONSTRAINT "IndustrySupervisor_userId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolSupervisor" DROP CONSTRAINT "SchoolSupervisor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "LogEntry" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "industrySupervisorProfileId",
DROP COLUMN "schoolSupervisorProfileId",
DROP COLUMN "studentProfileId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustrySupervisor" ADD CONSTRAINT "IndustrySupervisor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSupervisor" ADD CONSTRAINT "SchoolSupervisor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
