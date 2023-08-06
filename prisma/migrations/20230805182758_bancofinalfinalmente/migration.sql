-- CreateTable
CREATE TABLE "tbl_endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complemento" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "apelido" TEXT NOT NULL,
    "numero" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tbl_endereco_usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "tbl_endereco_usuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbl_endereco_usuario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "tbl_endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_endereco_id_key" ON "tbl_endereco"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_endereco_usuario_id_key" ON "tbl_endereco_usuario"("id");
