/*
  Warnings:

  - Added the required column `firstName` to the `IndustrySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `IndustrySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `IndustrySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clockInTime` to the `LogEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logDay` to the `LogEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logWeek` to the `LogEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `SchoolSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `SchoolSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `SchoolSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndustrySupervisor" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LogEntry" ADD COLUMN     "clockInTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "logDay" TEXT NOT NULL,
ADD COLUMN     "logWeek" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SchoolSupervisor" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL;
