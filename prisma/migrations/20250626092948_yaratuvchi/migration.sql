/*
  Warnings:

  - Added the required column `fileUploadBy` to the `movie_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie_file" ADD COLUMN     "fileUploadBy" TEXT NOT NULL;
