/*
  Warnings:

  - You are about to drop the column `chatId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_chatId_fkey`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `chatId`;

-- DropTable
DROP TABLE `Chat`;
