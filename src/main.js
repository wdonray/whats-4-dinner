import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import './style/main.scss'
import './api/firebase'

const app = createApp(App)

app.use(router)

app.mount('#app')
