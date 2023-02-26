import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import InvoiceView from "@/views/InvoiceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/invoice/:id",
      name: "Invoice",
      component: InvoiceView,
    },
  ],
});

export default router;
