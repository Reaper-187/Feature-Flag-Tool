/*
  Warnings:

  - You are about to drop the column `otp_code` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `otp_exp` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "otp_code",
DROP COLUMN "otp_exp";
