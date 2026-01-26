/*
  Warnings:

  - Made the column `name` on table `inventions` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inventions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventor" TEXT,
    "inventor_link" TEXT,
    "invention_link" TEXT,
    "related_links" TEXT
);
INSERT INTO "new_inventions" ("created_at", "description", "id", "image_url", "invention_link", "inventor", "inventor_link", "name", "related_links", "year") SELECT "created_at", "description", "id", "image_url", "invention_link", "inventor", "inventor_link", "name", "related_links", "year" FROM "inventions";
DROP TABLE "inventions";
ALTER TABLE "new_inventions" RENAME TO "inventions";
CREATE UNIQUE INDEX "inventions_name_key" ON "inventions"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
