-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tennisId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "offers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "offers_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_offers" ("id", "price", "tennisId", "userId") SELECT "id", "price", "tennisId", "userId" FROM "offers";
DROP TABLE "offers";
ALTER TABLE "new_offers" RENAME TO "offers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
