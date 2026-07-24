/*
  Warnings:

  - You are about to alter the column `status` on the `grouporder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the column `profileImage` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `KpopGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pobEvent` to the `GroupOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `GroupOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GroupOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSlots` to the `GroupOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `album` ADD COLUMN `coverImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `grouporder` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `pobEvent` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `reservedSlots` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalSlots` INTEGER NOT NULL,
    MODIFY `status` ENUM('OPEN', 'CLOSED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE `kpopgroup` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reservation` MODIFY `status` ENUM('RESERVED', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'RESERVED';

-- AlterTable
ALTER TABLE `store` ADD COLUMN `logo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profileImage`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `KpopGroup_name_key` ON `KpopGroup`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Store_name_key` ON `Store`(`name`);
