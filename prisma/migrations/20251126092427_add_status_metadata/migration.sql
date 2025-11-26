/*
  Warnings:

  - Added the required column `metadata` to the `ItemInstanceStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemInstanceStatus" ADD COLUMN     "metadata" JSONB NOT NULL;
