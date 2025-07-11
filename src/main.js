import 'primevue/resources/themes/aura-light-blue/theme.css'
import './assets/main.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import { createApp } from 'vue'
import App from './App.vue';
import router from './routes/index.js';
import PrimeVue from 'primevue/config';

import Card from 'primevue/card';
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Sidebar from "primevue/sidebar";
import Checkbox from "primevue/checkbox";
import SelectButton from 'primevue/selectbutton';
import i18n from './locale/i18n';
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(i18n);

app.component('pv-card',Card);
app.component('pv-inputText',InputText);
app.component('pv-sidebar',Sidebar);
app.component('pv-button',Button);
app.component('pv-checkbox',Checkbox);
app.component('pv-select', SelectButton);

app.mount('#app');