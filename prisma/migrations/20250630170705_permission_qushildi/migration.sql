-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "can_read" BOOLEAN NOT NULL DEFAULT false,
    "can_add" BOOLEAN NOT NULL DEFAULT false,
    "can_update" BOOLEAN NOT NULL DEFAULT false,
    "can_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_userId_key" ON "permissions"("userId");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
