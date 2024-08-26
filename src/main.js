import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css';
import * as lucideIcons from 'lucide-vue-next';

import { createRouter, createWebHistory } from 'vue-router';
import CreateAccount from '@/components/CreateAccountpage.vue';
import AuthentificationPage from '@/components/AuthentificationPage.vue';
import acceuilPage from './components/acceuilPage.vue';
import HomePage from '@/components/Home_page.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy_page.vue';
import side_bar from './components/includ/SideBar.vue';
import dashboardPage from './components/dashboardPage.vue';
import backlogsPage from './components/backlogsPage.vue';
import tasksPage from './components/tasksPage.vue';
import teamMemberPage from './components/teamMemberPage.vue';
import EnterprisePage from "./components/EnterprisePage.vue";
import ForgotpasswordPage from "./components/ForgotpasswordPage.vue";
import UpdatePasswordPage from  "./components/UpdatePasswordPage.vue";
import authSlides from "../src/components/includ/authSlides.vue";

const routes = [
  {path: '/authSlides', component: authSlides},
    { path: '/', component: LoadingPage },
    { path: '/CreateAccount', component: CreateAccount },
    { path: '/auth', component: AuthentificationPage },
    { path: '/side_bar', component: side_bar },
    { path: '/Home', component: HomePage },
    { path: '/Privacy', component: PrivacyPolicy },
    { path: '/acceuilPage', component: acceuilPage },
    { path: '/dashboardPage', component: dashboardPage },
    { path: '/backlogsPage', component: backlogsPage },
    { path: '/tasksPage', component: tasksPage },
    { path: '/teamMemberPage', component: teamMemberPage },
    { path: '/enterprisePage', component: EnterprisePage },
    { path: '/Forgotpassword', component: ForgotpasswordPage },
    { path: '/Updatepassword', component: UpdatePasswordPage },
  ]



const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  const app = createApp(App);
  
  Object.entries(lucideIcons).forEach(([name, component]) => {
    app.component(name, component);
    });
  app.use(router);
  app.mount('#app');