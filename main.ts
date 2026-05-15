import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApexCharts from 'vue3-apexcharts';
import App from './App .vue';

const app = createApp(App);
const pinia = createPinia();

// CRITICAL ORDER: Mount plugins BEFORE mounting the App
app.use(pinia);
app.component('apexchart', VueApexCharts);

app.mount('#app');