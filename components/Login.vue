<script lang="ts" setup>
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

const login = async () => {
  await auth.login();
  await router.push("/dashboard");
};
</script>

<template>
  <div class="card">
    <button type="button" @click="login">Try Demo</button>
  </div>
</template>

<style scoped></style>
