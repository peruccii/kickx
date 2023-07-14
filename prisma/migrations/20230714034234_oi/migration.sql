/*
  Warnings:

  - Added the required column `money` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "boxes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tennis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL,
    "usedDuration" TEXT,
    "fastSell" BOOLEAN NOT NULL DEFAULT false,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "code" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "purchasedById" TEXT,
    "boxesId" TEXT,
    CONSTRAINT "Tennis_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tennis_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tennis_boxesId_fkey" FOREIGN KEY ("boxesId") REFERENCES "boxes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tennis" ("code", "description", "fastSell", "id", "name", "photo", "price", "purchasedById", "sellerId", "size", "used", "usedDuration") SELECT "code", "description", "fastSell", "id", "name", "photo", "price", "purchasedById", "sellerId", "size", "used", "usedDuration" FROM "Tennis";
DROP TABLE "Tennis";
ALTER TABLE "new_Tennis" RENAME TO "Tennis";
CREATE UNIQUE INDEX "Tennis_code_key" ON "Tennis"("code");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "birthDate" DATETIME NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "money" REAL NOT NULL
);
INSERT INTO "new_user" ("birthDate", "cpf", "createdAt", "email", "id", "name", "password", "photo") SELECT "birthDate", "cpf", "createdAt", "email", "id", "name", "password", "photo" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "boxes_name_key" ON "boxes"("name");
