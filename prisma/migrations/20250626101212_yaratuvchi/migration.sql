/*
  Warnings:

  - Added the required column `sizeMb` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "sizeMb" INTEGER NOT NULL;
