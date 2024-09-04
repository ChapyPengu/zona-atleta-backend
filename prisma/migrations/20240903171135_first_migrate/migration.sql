/*
  Warnings:

  - You are about to drop the `ShoppingCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingCartProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_shoppingCartId_fkey`;

-- DropForeignKey
ALTER TABLE `ShoppingCartProduct` DROP FOREIGN KEY `ShoppingCartProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ShoppingCartProduct` DROP FOREIGN KEY `ShoppingCartProduct_shoppingCartId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `available` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `clientId` INTEGER NULL;

-- DropTable
DROP TABLE `ShoppingCart`;

-- DropTable
DROP TABLE `ShoppingCartProduct`;

-- CreateTable
CREATE TABLE `ClientProduct` (
    `productId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientProduct` ADD CONSTRAINT `ClientProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientProduct` ADD CONSTRAINT `ClientProduct_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
