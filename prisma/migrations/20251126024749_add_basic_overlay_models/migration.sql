-- CreateTable
CREATE TABLE "OverlayItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,

    CONSTRAINT "OverlayItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverlayItemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,

    CONSTRAINT "OverlayItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInstanceStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "overlayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemInstanceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverlayInstance" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "overlayType" TEXT NOT NULL,

    CONSTRAINT "OverlayInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStatusesOverlayInstance" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ItemStatusesOverlayInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OverlayItemToOverlayItemCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OverlayItemToOverlayItemCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ItemInstanceStatusToOverlayItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemInstanceStatusToOverlayItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OverlayItemToOverlayItemCategory_B_index" ON "_OverlayItemToOverlayItemCategory"("B");

-- CreateIndex
CREATE INDEX "_ItemInstanceStatusToOverlayItem_B_index" ON "_ItemInstanceStatusToOverlayItem"("B");

-- AddForeignKey
ALTER TABLE "ItemInstanceStatus" ADD CONSTRAINT "ItemInstanceStatus_overlayId_fkey" FOREIGN KEY ("overlayId") REFERENCES "ItemStatusesOverlayInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverlayInstance" ADD CONSTRAINT "OverlayInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStatusesOverlayInstance" ADD CONSTRAINT "ItemStatusesOverlayInstance_id_fkey" FOREIGN KEY ("id") REFERENCES "OverlayInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OverlayItemToOverlayItemCategory" ADD CONSTRAINT "_OverlayItemToOverlayItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "OverlayItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OverlayItemToOverlayItemCategory" ADD CONSTRAINT "_OverlayItemToOverlayItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "OverlayItemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemInstanceStatusToOverlayItem" ADD CONSTRAINT "_ItemInstanceStatusToOverlayItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemInstanceStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemInstanceStatusToOverlayItem" ADD CONSTRAINT "_ItemInstanceStatusToOverlayItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OverlayItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
