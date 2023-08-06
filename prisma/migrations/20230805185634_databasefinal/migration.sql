-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbl_endereco_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "tbl_endereco_usuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tbl_endereco_usuario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "tbl_endereco" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tbl_endereco_usuario" ("enderecoId", "id", "userId") SELECT "enderecoId", "id", "userId" FROM "tbl_endereco_usuario";
DROP TABLE "tbl_endereco_usuario";
ALTER TABLE "new_tbl_endereco_usuario" RENAME TO "tbl_endereco_usuario";
CREATE UNIQUE INDEX "tbl_endereco_usuario_id_key" ON "tbl_endereco_usuario"("id");
CREATE INDEX "tbl_endereco_usuario_enderecoId_fkey" ON "tbl_endereco_usuario"("enderecoId");
CREATE INDEX "tbl_endereco_usuario_userId_fkey" ON "tbl_endereco_usuario"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
