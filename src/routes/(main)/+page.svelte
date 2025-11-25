<script lang="ts">
  import { SignOut } from "@auth/sveltekit/components";

  import { getContext } from "svelte";
  import type { User } from "@prisma/client";

  const user: User = getContext('user');
</script>

<!-- TODO: List all channels which this user can control -->
