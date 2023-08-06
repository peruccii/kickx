/*
  Warnings:

  - The primary key for the `tbl_endereco_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbl_endereco_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "tbl_endereco_usuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbl_endereco_usuario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "tbl_endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tbl_endereco_usuario" ("enderecoId", "id", "userId") SELECT "enderecoId", "id", "userId" FROM "tbl_endereco_usuario";
DROP TABLE "tbl_endereco_usuario";
ALTER TABLE "new_tbl_endereco_usuario" RENAME TO "tbl_endereco_usuario";
CREATE UNIQUE INDEX "tbl_endereco_usuario_id_key" ON "tbl_endereco_usuario"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
