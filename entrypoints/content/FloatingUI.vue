<script setup lang="ts">
import { User } from "@/types";
import { ref } from "vue";
import { storage } from "wxt/storage";

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await storage.getItem<User>("local:user");
});
</script>

<template>
  <div class="wxt-floating-container">
    <h3>Maxint</h3>
    <pre v-if="user && user.user">
      Your budget is....
      {{ user?.user.email }}
    </pre>

    <!-- Add your content here -->
  </div>
</template>

<style scoped>
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
