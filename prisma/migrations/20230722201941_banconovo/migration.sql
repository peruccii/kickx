-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tennis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "used" BOOLEAN,
    "usedDuration" TEXT,
    "fastSell" BOOLEAN DEFAULT false,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "code" TEXT,
    "sellerId" TEXT,
    "purchasedById" TEXT,
    "boxesId" TEXT,
    "ownerId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Tennis_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tennis_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tennis_boxesId_fkey" FOREIGN KEY ("boxesId") REFERENCES "boxes" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tennis_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tennis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tennis" ("boxesId", "code", "description", "fastSell", "id", "name", "ownerId", "photo", "price", "purchasedById", "sellerId", "size", "used", "usedDuration", "userId") SELECT "boxesId", "code", "description", "fastSell", "id", "name", "ownerId", "photo", "price", "purchasedById", "sellerId", "size", "used", "usedDuration", "userId" FROM "Tennis";
DROP TABLE "Tennis";
ALTER TABLE "new_Tennis" RENAME TO "Tennis";
CREATE UNIQUE INDEX "Tennis_code_key" ON "Tennis"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
