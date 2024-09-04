/*
  Warnings:

  - You are about to drop the column `amuont` on the `ProductOrder` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductOrder` DROP COLUMN `amuont`,
    ADD COLUMN `amount` INTEGER NOT NULL;
