import { OverlayItem, OverlayItemCategory, PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

import { OverwatchHeroRole } from "../src/lib/types/overwatch";
import { overwatchHeroes, overwatchHeroImage } from "../src/lib/constants/overwatch";
import { toSlug } from "../src/lib/utils/string";

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!adminUser) {
    throw new Error("No users found in database. Please create a user before running the seed script.");
  }
  const db = enhance(prisma, { user: adminUser });
  await db.$transaction(async (tx) => {
    await tx.$executeRaw`TRUNCATE TABLE "OverlayItemCategory" RESTART IDENTITY CASCADE;`.catch(() => {});
    await tx.$executeRaw`TRUNCATE TABLE "_OverlayItemToOverlayItemCategory" RESTART IDENTITY CASCADE;`.catch(() => {});
    await tx.$executeRaw`TRUNCATE TABLE "OverlayItem" RESTART IDENTITY CASCADE;`.catch(() => {});
    // Create Overwatch hero role categories
    const owHeroRoles: Record<OverwatchHeroRole, OverlayItemCategory> = {
      "Tank": null!,
      "Damage": null!,
      "Support": null!,
    };
    for (const owRole of Object.values(OverwatchHeroRole)) {
      owHeroRoles[owRole] = await tx.overlayItemCategory.create({
        data: {
          name: owRole,
          description: `All ${owRole.toLowerCase()} heroes`,
          icon: `images/content/overwatch/${toSlug(owRole.toLowerCase())}.png`,
        }
      });
    }
    // Create Overwatch hero items
    const allHeroes: OverlayItem[] = [];
    for (const heroData of overwatchHeroes) {
      const hero = await tx.overlayItem.create({
        data: {
          name: heroData.name,
          icon: overwatchHeroImage(heroData.name),
          itemCategories: {
            connect: {
              id: owHeroRoles[heroData.role as OverwatchHeroRole].id,
            }
          }
        }
      });
      allHeroes.push(hero);
    }
    // Create example ItemStatus overlay
    await db.itemStatusesOverlayInstance.create({
      data: {
        title: "Example Overwatch Nuzlocke",
        description: "CactusPuppy's Overwatch Nuzlocke overlay",
        owner: {
          connect: { id: adminUser.id }
        },
        itemStatuses: {
          createMany: {
            data: [
              // { name: "Completed", color: "green",  }
            ]
          }
        }
      }
    })
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(-1);
  })
