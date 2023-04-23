import './api/firebase'
import './style/animations.css'
import './style/base.css'
import './style/main.css'
import './style/variables.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
