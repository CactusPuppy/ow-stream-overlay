import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from "@sveltejs/kit";
import { signIn } from "$lib/auth";

export const load: PageServerLoad = async (event) => {
  const auth = await event.locals.auth();
  if (auth?.user) redirect(303, "/");
};

export const actions: Actions = {
  default: signIn,
};
