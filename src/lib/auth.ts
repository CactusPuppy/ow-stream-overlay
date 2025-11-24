import { SvelteKitAuth } from "@auth/sveltekit";
import Twitch from "@auth/sveltekit/providers/twitch";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AUTH_TWITCH_ID, AUTH_TWITCH_SECRET } from "$env/static/private";
import { db } from "./db/client.server";

export const { handle } = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Twitch({
      clientId: AUTH_TWITCH_ID,
      clientSecret: AUTH_TWITCH_SECRET,
      authorization: {
        url: "https://id.twitch.tv/oauth2/authorize?response_type=code&prompt=login",
        params: {
          force_verify: "true",
          scope: ["channel:bot", "moderation:read", "moderator:manage:announcements"].join("+")
        }
      }
    })
  ],
});
