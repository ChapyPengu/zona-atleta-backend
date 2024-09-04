/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesManager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ClientProduct` DROP FOREIGN KEY `ClientProduct_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `ClientProduct` DROP FOREIGN KEY `ClientProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_responseId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductOrder` DROP FOREIGN KEY `ProductOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductOrder` DROP FOREIGN KEY `ProductOrder_productId_fkey`;

-- DropForeignKey
ALTER TABLE `SalesManager` DROP FOREIGN KEY `SalesManager_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `_ClientToProduct` DROP FOREIGN KEY `_ClientToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ClientToProduct` DROP FOREIGN KEY `_ClientToProduct_B_fkey`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `ClientProduct`;

-- DropTable
DROP TABLE `Comment`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `ProductOrder`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `Response`;

-- DropTable
DROP TABLE `SalesManager`;

-- DropTable
DROP TABLE `_ClientToProduct`;
