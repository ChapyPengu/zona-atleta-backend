-- AlterTable
ALTER TABLE `Product` ADD COLUMN `visits` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `LatestProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `LatestProduct_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LatestProduct` ADD CONSTRAINT `LatestProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
