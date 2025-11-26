import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AUTH_TWITCH_ID, AUTH_TWITCH_SECRET } from "$env/static/private";
import { db } from "../db/client.server";
import TwitchProvider from "./TwitchProvider";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers: [
    TwitchProvider({
      clientId: AUTH_TWITCH_ID,
      clientSecret: AUTH_TWITCH_SECRET,
    })
  ],
  trustHost: true,
});
