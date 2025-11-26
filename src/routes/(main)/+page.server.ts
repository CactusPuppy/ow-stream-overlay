import { redirect } from "@sveltejs/kit";
import { db } from "$lib/db/client.server";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async (event) => {
  const auth = await event.locals.auth();
  if (!auth?.user) redirect(303, "/signin");

  // TODO: Remove this once we have overlay creation
  const allHeroes = await db.overlayItem.findMany();
  return {
    items: allHeroes,
  }
};
