-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "factText" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Memory_factText_key" ON "Memory"("factText");
