-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invention_id" INTEGER NOT NULL,
    "iotd_id" INTEGER NOT NULL,
    "guesses" JSONB NOT NULL,
    "win" BOOLEAN NOT NULL,
    "ip_address" TEXT,
    "num_guesses" INTEGER NOT NULL,
    "user_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_result" ("created_at", "guesses", "id", "invention_id", "iotd_id", "num_guesses", "user_id", "win") SELECT "created_at", "guesses", "id", "invention_id", "iotd_id", "num_guesses", "user_id", "win" FROM "result";
DROP TABLE "result";
ALTER TABLE "new_result" RENAME TO "result";
CREATE INDEX "result_invention_id_idx" ON "result"("invention_id");
CREATE INDEX "result_user_id_idx" ON "result"("user_id");
CREATE INDEX "result_ip_address_idx" ON "result"("ip_address");
CREATE UNIQUE INDEX "result_user_id_iotd_id_key" ON "result"("user_id", "iotd_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
