<script setup lang="ts">
import { useApi } from "@/composables/api";
import { useAuth } from "@/composables/auth";
import { BudgetMonthlyLeftAmount, Deposit } from "@/types";
import { openNewTab } from "@/utils/tabs";
import { useRouter } from "vue-router";

const auth = useAuth();
const api = useApi();
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  await router.push("/login");
};

const openMaxint = async () => {
  await openNewTab({ url: "https://maxint.app" });
};

const budgetMonthlyLeftAmount = ref<BudgetMonthlyLeftAmount[]>([]);
const deposits = ref<Deposit[]>([]);

onMounted(async () => {
  if (!auth.user.value) return;

  budgetMonthlyLeftAmount.value = await api.getBudgetMonthlyLeftAmount(
    {
      userId: auth.user.value.user.id,
      month: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
        .toISOString()
        .split("T")[0],
    },
    { accessToken: auth.user.value.access_token }
  );

  deposits.value = await api.getDeposits(
    {
      offerCategory: "eq.checking",
      offset: 0,
      limit: 7,
      order: "offerAPY.desc.nullslast",
      select: "*",
    },
    { accessToken: auth.user.value.access_token }
  );

  console.log(deposits.value);
});
</script>

<template>
  <div>
    <p v-if="auth.user.value && auth.user.value.user">
      Welcome back {{ auth.user.value.user.email }}!
    </p>
    <p v-if="budgetMonthlyLeftAmount[0] != null">
      Nice! You have
      {{ budgetMonthlyLeftAmount[0].leftAmount.toFixed(2) }}$ left for this
      month
    </p>
    <div v-for="deposit in deposits" :key="deposit.id" class="deposit-item">
      <h3 class="bank-name">{{ deposit.bankName }}</h3>
      <div class="offer-details">
        {{ deposit.offerName }} - {{ deposit.offerAPY }}% APY
      </div>
      <div class="minimum-deposit">
        Minimum Deposit: ${{ deposit.minimumDeposit }}
      </div>
    </div>

    <button @click="openMaxint">Open Maxint</button>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
.deposit-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.deposit-item:hover {
  background-color: #f5f5f5;
}

.bank-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.offer-details {
  color: #666;
  margin-bottom: 0.25rem;
}

.minimum-deposit {
  color: #888;
  font-size: 0.9rem;
}
</style>
