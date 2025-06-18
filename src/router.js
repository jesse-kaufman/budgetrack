/** @file Vue router. */
import { createRouter, createWebHistory } from "vue-router"

import BudgetView from "./views/BudgetView.vue"

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", component: BudgetView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
