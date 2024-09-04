/*
  Warnings:

  - You are about to drop the column `responseId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_responseId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `responseId`;

-- AlterTable
ALTER TABLE `Favorite` DROP COLUMN `amount`;

-- AlterTable
ALTER TABLE `Like` DROP COLUMN `amount`;

-- AlterTable
ALTER TABLE `Response` ADD COLUMN `commentId` INTEGER NOT NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Response_commentId_key` ON `Response`(`commentId`);

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
