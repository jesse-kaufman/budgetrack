/** @file Vue router. */
import { createRouter, createWebHistory } from "vue-router"

import BudgetView from "./views/BudgetView.vue"

const routes = [
  { path: "/", redirect: "/budget" },
  {
    path: "/budget",
    component: BudgetView,
    meta: { title: "Budget" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
