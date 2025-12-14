-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invention_of_the_day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invention_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invention_of_the_day_invention_id_fkey" FOREIGN KEY ("invention_id") REFERENCES "inventions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_invention_of_the_day" ("created_at", "id", "invention_id") SELECT "created_at", "id", "invention_id" FROM "invention_of_the_day";
DROP TABLE "invention_of_the_day";
ALTER TABLE "new_invention_of_the_day" RENAME TO "invention_of_the_day";
CREATE INDEX "invention_of_the_day_invention_id_idx" ON "invention_of_the_day"("invention_id");
CREATE UNIQUE INDEX "invention_of_the_day_invention_id_created_at_key" ON "invention_of_the_day"("invention_id", "created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
