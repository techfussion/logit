-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_logEntryId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "department" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "industrySupervisorId" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "schoolSupervisorId" TEXT;

-- CreateIndex
CREATE INDEX "Student_industrySupervisorId_idx" ON "Student"("industrySupervisorId");

-- CreateIndex
CREATE INDEX "Student_schoolSupervisorId_idx" ON "Student"("schoolSupervisorId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_industrySupervisorId_fkey" FOREIGN KEY ("industrySupervisorId") REFERENCES "IndustrySupervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolSupervisorId_fkey" FOREIGN KEY ("schoolSupervisorId") REFERENCES "SchoolSupervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_logEntryId_fkey" FOREIGN KEY ("logEntryId") REFERENCES "LogEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
