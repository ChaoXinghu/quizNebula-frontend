import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
