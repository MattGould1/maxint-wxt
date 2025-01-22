<script setup lang="ts">
import { useApi } from "@/composables/api";
import { useAuth } from "@/composables/auth";
import { BudgetMonthlyLeftAmount } from "@/types";
import { useRouter } from "vue-router";

const auth = useAuth();
const api = useApi();
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  await router.push("/login");
};

const budgetMonthlyLeftAmount = ref<BudgetMonthlyLeftAmount>([]);

onMounted(async () => {
  if (!auth.user.value?.user.id) return;

  budgetMonthlyLeftAmount.value = await api.getBudgetMonthlyLeftAmount({
    userId: auth.user.value.user.id,
    month: "2025-01-01",
  });
});
</script>

<template>
  <div>
    <p>Welcome back {{ auth.user.value?.user.email }}!</p>
    <p v-if="budgetMonthlyLeftAmount[0] != null">
      Nice! You have
      {{ budgetMonthlyLeftAmount[0].leftAmount.toFixed(2) }}$ left for this
      month
    </p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>
