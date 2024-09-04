/*
  Warnings:

  - You are about to drop the column `shoppingCartId` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Client_shoppingCartId_key` ON `Client`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `shoppingCartId`;
