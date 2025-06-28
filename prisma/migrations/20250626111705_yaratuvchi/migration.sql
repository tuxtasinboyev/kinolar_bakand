-- DropForeignKey
ALTER TABLE "watch_history" DROP CONSTRAINT "watch_history_movieId_fkey";

-- AlterTable
ALTER TABLE "watch_history" ALTER COLUMN "movieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
