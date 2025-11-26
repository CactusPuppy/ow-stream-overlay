import type { OIDCConfig, OIDCUserConfig } from "@auth/core/providers/oauth";
import { type TwitchProfile } from "@auth/sveltekit/providers/twitch";


export default function Twitch(
  config: OIDCUserConfig<TwitchProfile>
): OIDCConfig<TwitchProfile> {
  return {
    issuer: "https://id.twitch.tv/oauth2",
    id: "twitch",
    name: "Twitch",
    type: "oidc",
    client: { token_endpoint_auth_method: "client_secret_post" },
    authorization: {
      params: {
        force_verify: true,
        scope: "openid user:read:email channel:bot moderation:read user:read:moderated_channels moderator:manage:announcements",
        claims: {
          id_token: { email: null, picture: null, preferred_username: null },
        },
      },
    },
    token: {
      async conform(response) {
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
    options: config,
  };
}
