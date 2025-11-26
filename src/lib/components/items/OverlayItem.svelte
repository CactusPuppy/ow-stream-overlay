<script lang="ts">
  import type { OverlayItem } from "@prisma/client";

  const { item, large, active }: {
    item: OverlayItem,
    large?: boolean,
    active?: boolean,
    draggable?: boolean,
    // TODO: drag event listeners
  } = $props();
</script>

<div class="overlay-item" class:large class:active>
  <img src={item.icon} alt={item.name} width={large ? 80 : 50} height={large ? 80 : 50} />
</div>

<style lang="scss">
  .overlay-item {
    --size: #{px-to-rem(48)};
    display: block;
    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    background: $color-bg-hero;
    border-radius: $border-radius-small;
    border: 2px solid $white;
    overflow: hidden;
    transition: transform 50ms;

    &:hover {
      transform: scale(1.1);
    }

    &.large {
      --size: #{px-to-rem(80)};
      border-radius: $border-radius;

      &:hover {
        transform: scale(1.05);
      }
    }

    &.active {
      transform: scale(1.25);
      border-color: $primary;
      box-shadow: 0 0 0 2px $primary;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
</style>


