<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import TwitchIcon from "$lib/assets/icons/TwitchGlitchPurple.svg";

  let signingIn = $state(false);

  const handleClick = async() => {
    signingIn = true;
    signIn("twitch");
  }
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
  <h1 class="text-2xl font-bold">Sign In</h1>
  <button class="mt-2 p-2 rounded-sm bg-purple-700 text-white cursor-pointer hover:bg-purple-600" onclick={handleClick} data->
    <img src={TwitchIcon} alt="Twitch Logo" class="inline w-6 h-6 mr-1" />
    Sign in with Twitch
  </button>
</div>
