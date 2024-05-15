-- CreateTable
CREATE TABLE "employe" (
    "name" VARCHAR(10)
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) DEFAULT 'Item',
    "status" TEXT NOT NULL DEFAULT 'A',

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
