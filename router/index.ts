import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/components/Login.vue";
import MainDashboard from "@/components/Main/Dashboard.vue";
import { useAuth } from "@/composables/auth";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: MainDashboard,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  // Use hash history for browser extensions
  history: createWebHashHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to) => {
  const auth = useAuth();
  const isAuthenticated = await auth.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "Login" };
  }

  if (to.name === "Login" && isAuthenticated) {
    return { name: "Dashboard" };
  }
});
