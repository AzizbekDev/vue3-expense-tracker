import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(Toast)
app.use(autoAnimatePlugin)
app.mount('#app')
