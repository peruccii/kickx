-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "birthDate" DATETIME NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tennis" (
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
    CONSTRAINT "Tennis_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tennis_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tennis_brand" (
    "tennisId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    PRIMARY KEY ("tennisId", "brandId"),
    CONSTRAINT "tennis_brand_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tennis_brand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_like" (
    "userId" TEXT NOT NULL,
    "tennisId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tennisId"),
    CONSTRAINT "user_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_like_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_cart" (
    "userId" TEXT NOT NULL,
    "tennisId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tennisId"),
    CONSTRAINT "user_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_cart_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tennisId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "offers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "offers_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "giveaways" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tennisId" TEXT NOT NULL,
    CONSTRAINT "giveaways_tennisId_fkey" FOREIGN KEY ("tennisId") REFERENCES "Tennis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    CONSTRAINT "problems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "premiun_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "coupons" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT NOT NULL DEFAULT 'premium',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "premiun_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tennis_code_key" ON "Tennis"("code");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "premiun_user_userId_key" ON "premiun_user"("userId");
