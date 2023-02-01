import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import GAuth from 'vue3-google-oauth2';

const gAuthOptions = {
    clientId: '1066142769848-nb4mnr77e05v52jjpear80vu8mvjvt6v.apps.googleusercontent.com',
    scope: 'email',
    prompt: 'consent',
    plugin_name: '42Kanbanboard', // 중요! library를 통해서,
    // callbackURL: 'http://localhost:3000/api/v1/auth/login/google'
    // fetch_basic_profile: false
}

const app = createApp(App)

app.use(GAuth, gAuthOptions)
app.use(router).mount('#app')
app.config.globalProperties.user = undefined
