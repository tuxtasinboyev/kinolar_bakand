/*
  Warnings:

  - The `name` column on the `subscription_plans` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "subscription_plans" DROP COLUMN "name",
ADD COLUMN     "name" "SubscriptionType" NOT NULL DEFAULT 'free';
