<script setup lang="ts">
import { Deposit, User } from "@/types";
import { ref } from "vue";
import { storage } from "wxt/storage";

const user = ref<User | null>(null);
const api = useApi();

const deposits = ref<Deposit[]>([]);

onMounted(async () => {
  console.log("onMounted");
  user.value = await storage.getItem<User>("local:user");
  if (user.value == null) return;
  deposits.value = await api.getDeposits(
    {
      offerCategory: "eq.checking",
      offset: 0,
      limit: 7,
      order: "offerAPY.desc.nullslast",
      select: "*",
    },
    { accessToken: user.value.access_token }
  );
  console.log(deposits.value);
});
</script>

<template>
  <div>
    <img class="logo" src="@/assets/maxint-svg-transparent.svg" alt="Maxint" />
    Maxint

    <div v-if="deposits.length > 0" class="wxt-floating-panel">
      <div v-for="deposit in deposits" :key="deposit.id" class="deposit-item">
        <h3 class="bank-name">{{ deposit.bankName }}</h3>
        <div class="offer-details">
          {{ deposit.offerName }} - {{ deposit.offerAPY }}% APY
        </div>
        <div class="minimum-deposit">
          Minimum Deposit: ${{ deposit.minimumDeposit }}
        </div>
      </div>
    </div>

    <!-- Add your content here -->
  </div>
</template>

<style scoped>
.logo {
  width: 30px;
}

.wxt-floating-container {
  z-index: 999999;
  font-family: system-ui, sans-serif;
}

.wxt-floating-button {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.2s;
}

.wxt-floating-button:hover {
  transform: scale(1.05);
}

.wxt-floating-panel {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border: 1px solid #eee;
}

/* Ensure our styles don't get overridden */
:deep(*) {
  font-family: system-ui, sans-serif !important;
}
</style>
