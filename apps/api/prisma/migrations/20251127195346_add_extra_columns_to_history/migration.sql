/*
  Warnings:

  - Added the required column `quantity` to the `historial_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `historial_compra` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_historial_compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "creado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado" DATETIME,
    "eliminado" DATETIME,
    CONSTRAINT "historial_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_historial_compra" ("actualizado", "creado", "eliminado", "id", "usuario_id") SELECT "actualizado", "creado", "eliminado", "id", "usuario_id" FROM "historial_compra";
DROP TABLE "historial_compra";
ALTER TABLE "new_historial_compra" RENAME TO "historial_compra";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
