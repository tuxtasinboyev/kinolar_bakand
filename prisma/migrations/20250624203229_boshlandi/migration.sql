-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';
