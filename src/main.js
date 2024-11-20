import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import "@/assets/style.css"; // Importer le fichier CSS globalement
import "@/assets/dataTables.css"; // Importer le fichier CSS globalement
import "vue3-toastify/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persist";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";


DataTable.use(DataTablesLib);

import UiTable from "balm-ui/components/table";
// import VueQrcodeReader from 'vue-qrcode-reader'
import BalmUI from "balm-ui"; // Official Google Material Components
// import BalmUIPlus from "balm-ui/dist/balm-ui-plus"; // BalmJS Team Material Components
import "balm-ui-css";
//import UiDialogComponents from 'balm-ui/components/dialog';

const app = createApp(App);
app.use(router);
//app.use(UiDialogComponents);

// app.use(QrReader);
// app.use(QRCodeVue3);
app.use(BalmUI);
// app.use(BalmUIPlus);

app.use(UiTable, {});
// app.use(VueQrcodeReader);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount("#app");
