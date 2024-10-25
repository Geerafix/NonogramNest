import './assets/main.css'
import './components/user/profile/form-style.css'
import './components/admin/management/management-style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const app = createApp(App)

app.component('Icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
