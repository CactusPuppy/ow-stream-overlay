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
        issuer: "https://id.twitch.tv/oauth2/",
        params: {
          force_verify: "true",
          scope: ["openid", "user:read:email", "channel:bot", "moderation:read", "moderator:manage:announcements"].join(" "),
          claims: JSON.stringify({
            "id_token": {
              "preferred_username": null,
              "email": null,
              "picture": null
            }
          }),
        }
      }
    })
  ],
});
