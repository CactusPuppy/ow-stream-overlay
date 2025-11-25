<script lang="ts">
  import { SignOut } from "@auth/sveltekit/components";
  import { getContext } from "svelte";
  import CactusPuppyIcon from "$lib/assets/icons/CactusPuppy.png";
  import type { User } from "@prisma/client";

  const user: User = getContext('user');
</script>

<nav class="h-12 p-2">
  <div class="content">
    <a href="/" class="logo">
      <img src={CactusPuppyIcon} alt="Go Home" class="w-8 h-8 mr-2" />
      <span class="logo__desktop text-gray-200 font-bold text-lg">CactusPuppy's Overlays</span>
    </a>

    <div class="flex gap-4 items-center">
      {#if user}
        <p class="mr-4">Signed in as <span class="text-white font-bold">{user.name}</span></p>
        <SignOut>
          {#snippet submitButton()}
            <div class="button">Sign Out</div>
          {/snippet}
        </SignOut>
      {:else}
        <a href="/login" class="btn">Sign In</a>
      {/if}
    </div>
  </div>
</nav>

<style lang="scss">
  @use "sass:map";

  // Create a gradient background to fills the available space, always leaving an opaque block of at least page-max-width
  // For instance if a screen width is 2000px the gradient is [transparent to opaque for 400px][opaque for 1200px][opaque to transparent for 400px]
  // If the screen width is smaller than page-max-width the background is always fully opaque.
  // Convoluted? Maybe. Neat? I think so!
  $opaque-width: min(map.get($breakpoints, page-max-width), 100%);
  $fade-width: max((100vw - map.get($breakpoints, page-max-width)) / 2, 0px);
  $start-opaque: $fade-width;
  $end-opaque: calc($start-opaque + $opaque-width);

  nav {
    height: $navigation-height;
    background: rgba($color-bg-dark, 0.75);
    mask-image: linear-gradient(
      to right,
      transparent,
      white $start-opaque,
      white $end-opaque,
      transparent
    );
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: 0 1rem;
    margin: 0 auto;

    @include breakpoint(mobile) {
      padding: 0 $gutter;
    }

    @include breakpoint(desktop) {
      gap: 3rem;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    &:hover {
      filter: brightness(1.2);
    }
  }

  .logo__desktop {
    display: none;

    @include breakpoint(tablet) {
      display: block;
    }
  }
</style>
