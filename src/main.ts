import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { createPinia } from "pinia";
import "@/store/access";

const pinia = createPinia();
const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.use(pinia);
app.mount("#app");
