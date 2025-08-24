/** @file Main app file. */
import "./assets/main.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router.js"

createApp(App).use(router).use(createPinia()).mount("#app")
