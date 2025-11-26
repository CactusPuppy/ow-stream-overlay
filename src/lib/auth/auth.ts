import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AUTH_TWITCH_ID, AUTH_TWITCH_SECRET } from "$env/static/private";
import { db } from "../db/client.server";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers: [
    {
      id: "twitch",
      name: "Twitch",
      type: "oidc",
      issuer: "https://id.twitch.tv/oauth2",
      client: { token_endpoint_auth_method: "client_secret_post" },
      clientId: AUTH_TWITCH_ID,
      clientSecret: AUTH_TWITCH_SECRET,
      authorization: {
        params: {
          force_verify: true,
          scope: [
            "openid",
            "user:read:email",
            "channel:bot",
            "moderation:read",
            "user:read:moderated_channels",
            "moderator:manage:announcements",
          ].join(" "),
          claims: {
            id_token: { email: null, picture: null, preferred_username: null },
          },
        },
      },
      token: {
        async conform(response: Response) {
          const body = await response.json();
          if (response.ok) {
            if (typeof body.scope === "string") {
              console.warn(
                "'scope' is a string. Redundant workaround, please open an issue."
              );
            } else if (Array.isArray(body.scope)) {
              body.scope = body.scope.join(" ");
              return new Response(JSON.stringify(body), response);
            } else if ("scope" in body) {
              delete body.scope;
              return new Response(JSON.stringify(body), response);
            }
          } else {
            const { message: error_description, error } = body;
            if (typeof error !== "string") {
              return new Response(
                JSON.stringify({ error: "invalid_request", error_description }),
                response
              );
            }
            console.warn(
              "Response has 'error'. Redundant workaround, please open an issue."
            );
          }
        },
      },
      style: { bg: "#65459B", text: "#fff" },
    }
  ],
  trustHost: true,
});
