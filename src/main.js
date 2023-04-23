import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import './style/main.css'
import './style/variables.css'
import './style/base.css'
import './style/animations.css'
import './api/firebase'

const app = createApp(App)

app.use(router)

app.mount('#app')
