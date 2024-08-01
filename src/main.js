import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { createRouter, createWebHistory } from 'vue-router';
import CreateAccount from '@/components/CreateAccountpage.vue';
import AuthentificationPage from '@/components/AuthentificationPage.vue';
import HomePage from '@/components/Home_page.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy_page.vue';
import side_bar from './components/includ/SideBar.vue';

const routes = [
    { path: '/', component: LoadingPage },
    { path: '/CreateAccount', component: CreateAccount },
    { path: '/auth', component: AuthentificationPage },
    { path: '/side_bar', component: side_bar },
    { path: '/Home', component: HomePage },
    { path: '/Privacy', component: PrivacyPolicy },
]



const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  const app = createApp(App);
  app.use(router);
  app.mount('#app');