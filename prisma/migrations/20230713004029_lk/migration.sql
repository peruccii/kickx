-- CreateTable
CREATE TABLE "inobserve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tennisId" TEXT,
    CONSTRAINT "inobserve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inobserve_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
