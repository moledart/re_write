/*
  Warnings:

  - You are about to drop the `_CategoryToNote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToNote" DROP CONSTRAINT "_CategoryToNote_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToNote" DROP CONSTRAINT "_CategoryToNote_B_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryToNote";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
