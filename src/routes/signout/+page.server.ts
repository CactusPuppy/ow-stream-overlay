import { signOut } from '$lib/auth/auth';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: signOut,
}
