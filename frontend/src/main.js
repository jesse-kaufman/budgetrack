/** @file Main app file. */
import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router.js"

createApp(App).use(router).use(createPinia()).mount("#app")
