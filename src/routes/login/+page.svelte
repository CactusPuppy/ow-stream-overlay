<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
</script>

<div>
  <button on:click={() => signIn("twitch")}>Sign in with Twitch</button>
</div>
