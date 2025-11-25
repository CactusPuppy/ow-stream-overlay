import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async (event) => {
  const auth = await event.locals.auth();
  if (!auth?.user) redirect(303, "/signin");
};
