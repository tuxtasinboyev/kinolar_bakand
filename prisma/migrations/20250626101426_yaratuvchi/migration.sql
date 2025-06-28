/*
  Warnings:

  - You are about to drop the column `sizeMb` on the `favorite` table. All the data in the column will be lost.
  - Added the required column `sizeMb` to the `movie_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "sizeMb";

-- AlterTable
ALTER TABLE "movie_file" ADD COLUMN     "sizeMb" INTEGER NOT NULL;
