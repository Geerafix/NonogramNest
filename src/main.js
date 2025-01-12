import './assets/main.css'
import './components/user/profile/form-style.css'
import './components/admin/management/management-style.css'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Header from '@/components/shared/Header.vue'
import Notification from "@/components/shared/Notification.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";

library.add(fas)

const app = createApp(App)

app.component('Icon', FontAwesomeIcon)
    .component('Header', Header)
    .component('Notification', Notification)
    .component('BasicButton', BasicButton)
    .component('BasicInput', BasicInput)

app.use(router)
app.mount('#app')
