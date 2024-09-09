/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `SalesManager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `chatId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Response` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Client_chatId_key` ON `Client`(`chatId`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesManager_username_key` ON `SalesManager`(`username`);

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
