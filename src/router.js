/** @file Vue router. */
import { createRouter, createWebHistory } from "vue-router"

import LoanList from "./views/LoanList.vue"
import LoanView from "./views/LoanView.vue"

const routes = [
  { path: "/", redirect: "/ConstructionLoans" },
  { path: "/ConstructionLoans", component: LoanList },
  { path: "/ConstructionLoans/:id", component: LoanView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
