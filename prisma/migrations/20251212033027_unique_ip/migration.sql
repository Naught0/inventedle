/*
  Warnings:

  - A unique constraint covering the columns `[ip_address,iotd_id]` on the table `result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "result_ip_address_iotd_id_key" ON "result"("ip_address", "iotd_id");
