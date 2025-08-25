import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { tiltDirective } from './plugins/tilt'

const app = createApp(App)
app.use(createPinia())
app.directive('tilt', tiltDirective)
app.mount('#app')
