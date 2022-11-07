import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//完整引入ele plus
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

const app: any = createApp(App);
app.use(store).use(router).mount("#app");
