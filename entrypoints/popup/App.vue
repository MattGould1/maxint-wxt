<script lang="ts" setup>
import { useAsync } from "@/composables/async";
import { useAuth } from "@/composables/auth";

const auth = useAuth();

const { data, loading, error, execute } = useAsync(async () => {
  console.log("auth.isAuthenticated()");
  return await auth.isAuthenticated();
});

execute();
</script>

<template>
  <div class="background">
    <img
      class="logo-img"
      src="@/assets/maxint-svg-transparent.svg"
      alt="Maxint"
    />

    <RouterView />
  </div>
</template>

<style scoped>
.logo-img {
  width: 50px;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #54bc4ae0);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
