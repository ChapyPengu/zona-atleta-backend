/*
  Warnings:

  - You are about to alter the column `amount` on the `ProductOrder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `LatestProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LatestProduct` DROP FOREIGN KEY `LatestProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `ProductOrder` MODIFY `amount` INTEGER NOT NULL;

-- DropTable
DROP TABLE `LatestProduct`;

-- CreateTable
CREATE TABLE `Last` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `Last_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Last` ADD CONSTRAINT `Last_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
