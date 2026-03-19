-- AlterTable
ALTER TABLE "Sketch" ADD COLUMN     "templateId" TEXT;

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
